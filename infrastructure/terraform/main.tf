provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "studentswap" {
  ami                    = "ami-0b72821e2f351e396" # Amazon Linux 2 AMI (HVM), SSD Volume Type for us-east-1
  instance_type          = "t3.medium"
  key_name               = "terraform"
  monitoring             = false

  root_block_device {
    volume_size           = 30
    volume_type           = "gp3"
    delete_on_termination = true
    encrypted             = true
  }

  vpc_security_group_ids = [aws_security_group.allow_http_ssh.id]

  associate_public_ip_address = true

  tags = {
    Name = "studentswap"
  }

  user_data = file("userdata.sh")
}

resource "aws_security_group" "allow_http_ssh" {
  name        = "allow_http_ssh"
  description = "Allow HTTP, HTTPS, and SSH inbound traffic"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
  from_port   = 8080
  to_port     = 8080
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]
}

  egress {
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "AllowHTTPSSH"
  }
}

resource "aws_eip" "studentswap_eip" {
  instance = aws_instance.studentswap.id
  vpc      = true

  tags = {
    Name = "studentswap-eip"
  }
}
