pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/UML-GUI-II-GROUP-1/studentswap.git'
        BRANCH = 'main'
        FRONTEND_DIR = 'frontend'
        BACKEND_DIR = 'backend'
        DEPLOY_DIR = '/var/www/html'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: "${env.BRANCH}", url: "${env.REPO_URL}"
            }
        }

        stage('Build Frontend') {
            steps {
                dir("${env.FRONTEND_DIR}") {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir("${env.BACKEND_DIR}") {
                    sh 'npm install'
                }
            }
        }

        stage('Deploy Frontend') {
            steps {
                sh """
                    sudo rm -rf ${env.DEPLOY_DIR}/*
                    sudo cp -r ${env.FRONTEND_DIR}/build/* ${env.DEPLOY_DIR}/
                    sudo systemctl restart httpd
                """
            }
        }

        stage('Deploy Backend') {
            steps {
                script {
                    def backendDir = "${env.WORKSPACE}/${env.BACKEND_DIR}"
                    sh """
                        pm2 delete all || true
                        pm2 start ${backendDir}/src/app.js --name studentswap-backend
                        pm2 save
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment completed successfully!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
