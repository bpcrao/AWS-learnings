const imageMagic = require('imagemagick');
const fs = require('fs');
const os = require('os');
const uuid = require('uuid/v4');
const { promisify } = require('util');
const aws = require('aws-sdk');
      aws.config.update({ region: 'us-east-1' });
const s3 = new aws.S3();
const resizeImageAsync = promisify(imageMagic.resize);
const readsFileAsync = promisify(fs.readFile);
const unlinkFileAsync = promisify(fs.unlink);


exports.handler = async (event) => {
    let filesProcessed = event.Records.map(async (record) => {

        let bucket = record.s3.bucket.name;
        let fileName = record.s3.object.key;
        var params = {
            Bucket: bucket,
            Key: fileName
        };

        //get file
        let inputData = await s3.getObject(params).promise();
        let tempFile = os.tmpdir() + "/" + uuid() + '.jpg';
        let resizeArgs = {
            srcData: inputData.Body,
            dstPath: tempFile,
            width: 150
        };


        //resize using image magic
        await resizeImageAsync(resizeArgs);

        //read the resized file
        let resizedData = await readsFileAsync(tempFile)

        //upload the new file to s3
        let targetFileName = fileName.substring(0, fileName.lastIndexOf('.')) + " -small.jpg";
        
        params = {
            Bucket: "purna-srcimages-dest", Key: targetFileName, Body: new Buffer(resizedData), ContentType: 'image/jpeg'
        };
        await s3.putObject(params).promise();
        return await unlinkFileAsync(tempFile);
    });

    await Promise.all(filesProcessed);
    return "done";
}