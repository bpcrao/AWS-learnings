import json
import boto3

ec2Client = boto3.client('ec2')
snsClient = boto3.client('sns')



def stop_ec2(event, context):
    ec2_instances = get_all_ec2_ids()
    response = ec2Client.stop_instances(
        InstanceIds=ec2_instances,
        DryRun=False
    )
    if(len(ec2_instances)>0):
        snsClient.publish(
        Message=json.dumps({'default': json.dumps(response)}),
        MessageStructure='json',
        PhoneNumber='+919160278155'
        )
    return response

def get_all_ec2_ids():
    response = ec2Client.describe_instances(DryRun=False)
    instances = []
    for reservation in response['Reservations']:
        for instance in reservation['Instances']:
            instances.append(instance['InstanceId'])
    return instances