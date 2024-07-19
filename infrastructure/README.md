# StudentSwap Infrastructure Setup

This document provides a comprehensive guide on setting up the infrastructure for the StudentSwap project using AWS EC2, Terraform, a user data script, and Jenkins for CI/CD.

## Project Overview

StudentSwap is a dedicated platform for university students to buy and sell new or used furniture and home goods. Access to the website is restricted to users with valid student email addresses, creating a trusted and secure environment specifically for the student community.

## Prerequisites

Before you start, ensure you have the following:

1. An AWS account with access credentials.
2. Terraform installed on your local machine.
3. An SSH key pair for accessing the EC2 instance.
4. A GitHub repository for the StudentSwap project.
5. Jenkins installed and set up on the EC2 instance (covered in the user data script).

## Infrastructure Setup

### EC2 Instance Setup with Terraform

1. **Provider Configuration**: Define the AWS provider and the region.
2. **EC2 Instance Configuration**: Set up the EC2 instance with the required AMI, instance type, key pair, security group, and user data script.
3. **Security Group Configuration**: Configure the security group to allow necessary inbound and outbound traffic.
4. **Elastic IP Configuration**: Allocate and associate an Elastic IP address to the EC2 instance to ensure the public IP remains the same after stopping and starting the instance.

### User Data Script

The user data script automates the setup of the EC2 instance by:

1. Updating the system.
2. Installing Apache for serving the frontend.
3. Installing Java and Jenkins for CI/CD.
4. Installing Node.js and npm for backend development.
5. Installing Git to clone the project repository.
6. Installing PM2 to manage the Node.js application.
7. Cloning the StudentSwap project repository from GitHub.
8. Installing dependencies and building the frontend.
9. Configuring Apache to serve the built frontend files.
10. Installing dependencies and starting the backend with PM2.
11. Configuring the firewall to allow necessary ports for Jenkins, Apache, and the backend application.

### Jenkins CI/CD Pipeline

The Jenkins pipeline automates the build and deployment process:

1. **Checkout Stage**: Clones the StudentSwap repository from GitHub.
2. **Build Frontend Stage**: Installs dependencies and builds the React frontend.
3. **Build Backend Stage**: Installs dependencies for the Node.js backend.
4. **Deploy Frontend Stage**: Copies the built frontend files to the Apache web root directory and restarts Apache.
5. **Deploy Backend Stage**: Uses PM2 to manage the backend application.

### Jenkinsfile

The Jenkinsfile defines the pipeline for building and deploying the StudentSwap application. It includes stages for checking out the code, building the frontend and backend, and deploying the application.

## Steps to Deploy

1. **Setup Terraform**:
   - Initialize Terraform: `terraform init`
   - Plan the infrastructure: `terraform plan`
   - Apply the configuration: `terraform apply`

2. **Access Jenkins**:
   - Open Jenkins at `http://<your_instance_public_ip>:8080`.
   - Follow the setup instructions and unlock Jenkins using the initial admin password located at `/var/lib/jenkins/secrets/initialAdminPassword`.

3. **Create a New Pipeline Job in Jenkins**:
   - Go to Jenkins Dashboard > New Item > Pipeline.
   - Name the job and select Pipeline.
   - In the Pipeline section, choose Pipeline script from SCM.
   - Set SCM to Git and provide your repository URL.
   - Set the branch to your working branch.
   - Ensure the `Jenkinsfile` is in the root of your repository.

4. **Run the Jenkins Job**:
   - Build the pipeline job.
   - Jenkins will check out the code, build the frontend and backend, and deploy them to the EC2 instance.

## Conclusion

Following this guide, you will set up the necessary infrastructure for the StudentSwap project, automate the setup of your EC2 instance, and establish a CI/CD pipeline with Jenkins to streamline the build and deployment process. Your application will be running on the EC2 instance, with the frontend served by Apache and the backend managed by PM2.
