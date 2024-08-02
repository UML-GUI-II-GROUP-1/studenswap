pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/UML-GUI-II-GROUP-1/studentswap.git'
        BRANCH = 'main'
        FRONTEND_DIR = 'frontend'
        BACKEND_DIR = 'backend'
        FRONTEND_DEPLOY_DIR = '/var/www/html'
        BACKEND_SERVICE_NAME = 'studentswap-backend'
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
                    sudo rm -rf ${env.FRONTEND_DEPLOY_DIR}/*
                    sudo cp -r ${env.FRONTEND_DIR}/build/* ${env.FRONTEND_DEPLOY_DIR}/
                    sudo systemctl restart nginx
                """
            }
        }

        stage('Deploy Backend') {
            steps {
                script {
                    def backendDir = "${env.WORKSPACE}/${env.BACKEND_DIR}"
                    sh """
                        pm2 delete ${env.BACKEND_SERVICE_NAME} || true
                        pm2 start ${backendDir}/server.js --name ${env.BACKEND_SERVICE_NAME}
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
