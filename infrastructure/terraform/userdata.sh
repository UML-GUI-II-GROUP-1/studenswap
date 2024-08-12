#!/bin/bash
# Update the system
sudo yum update -y

# Install Apache
sudo yum install -y httpd
sudo systemctl start httpd
sudo systemctl enable httpd
echo "<h1>Welcome to StudentSwap</h1>" | sudo tee /var/www/html/index.html

# Install Java (required for Jenkins)
sudo yum install -y java-1.8.0-openjdk

# Install Jenkins
wget -O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins-ci.org/redhat-stable/jenkins.repo
rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
sudo yum install -y jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins

# Install Node.js and npm
curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -
sudo yum install -y nodejs

# Install Git
sudo yum install -y git

# Install PM2 globally
sudo npm install -g pm2

# Clone the project repository
git clone https://github.com/UML-GUI-II-GROUP-1/studentswap.git /home/ec2-user/studentswap

# Navigate to the project directory and install dependencies for backend
cd /home/ec2-user/studentswap/backend
npm install

# Start the backend application with PM2
pm2 start src/app.js --name studentswap-backend
pm2 startup
pm2 save

# Navigate to the frontend directory and install dependencies
cd /home/ec2-user/studentswap/frontend
npm install
npm run build

# Configure Apache to serve the React frontend
sudo rm -rf /var/www/html/*
sudo cp -r build/* /var/www/html/

# Restart Apache to apply changes
sudo systemctl restart httpd

# Open required ports for Jenkins, Apache, and Node.js
sudo firewall-cmd --permanent --add-port=8080/tcp # Jenkins
sudo firewall-cmd --permanent --add-port=80/tcp   # HTTP
sudo firewall-cmd --permanent --add-port=443/tcp  # HTTPS
sudo firewall-cmd --reload
