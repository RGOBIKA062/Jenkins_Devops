pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        PM2_HOME = 'C:\\pm2'
        GROQ_API_KEY = 'sk_PIqc0VO5BKrLW1Uc1PB5WGdyb3FY6dggS9tpowHCEFfGE9DjHeM6'
        JWT_SECRET = 'mySuperSecret123456'
        PORT = '5000'
    }

    stages {

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
                    bat 'npx pm2 delete server || exit 0'
                    bat 'npx pm2 start index.js --name server'
                }
            }
        }

        stage('Serve Frontend') {
            steps {
                dir('client') {
                    bat 'npm install -g serve'
                    bat 'npx pm2 delete frontend || exit 0'
                    bat 'npx pm2 start "npx serve -s dist -l 3000" --name frontend'
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
