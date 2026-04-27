pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    stages {

        stage('Clean Workspace') {
            steps {
                deleteDir()
            }
        }

        stage('Clone Code') {
            steps {
                git 'https://github.com/RGOBIKA062/Jenkins_Devops.git'
            }
        }

        stage('Install Backend') {
            steps {
                dir('server') {
                    bat 'npm install'
                }
            }
        }

        stage('Install Frontend') {
            steps {
                dir('client') {
                    bat 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('client') {
                    bat 'npm run build'
                }
            }
        }

        stage('Run Backend') {
            steps {
                dir('server') {
                    bat 'start cmd /c node server.js'
                }
            }
        }

        stage('Serve Frontend') {
            steps {
                dir('client') {
                    bat 'start cmd /c npx serve -s build'
                }
            }
        }
    }

    post {
        success {
            echo 'Build Successful 🚀'
        }
        failure {
            echo 'Build Failed ❌'
        }
    }
}
