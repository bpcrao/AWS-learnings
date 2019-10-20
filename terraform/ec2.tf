variable "aws_secret_access_key" {
  default=""
}
variable "aws_access_key_id" {
  default=""
}

variable "image_id" {
  default=""
}


provider "aws" {
    access_key = var.aws_access_key_id
    secret_key = var.aws_secret_access_key
    region = "us-east-1"
}

resource "aws_instance" "webs" {
  instance_type = "t1.micro"
  ami           = var.image_id
  subnet_id              = "subnet-0e8086bc6e8f3f3a6"
  security_groups = ["sg-0a95070ef10b99fdc"]
  tags = {
    Name = "HelloWorld"
  }
}