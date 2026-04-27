pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    stages {

        // ❌ REMOVE deleteDir (VERY IMPORTANT)

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
                    bat 'pm2 delete server || exit 0'
                    bat 'pm2 start server.js --name server'
                }
            }
        }

        stage('Serve Frontend') {
            steps {
                dir('client') {
                    bat 'pm2 delete frontend || exit 0'
                    bat 'pm2 start "npx serve -s build -l 3000" --name frontend'
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
