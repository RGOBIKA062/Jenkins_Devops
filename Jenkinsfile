pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        PM2_HOME = 'C:\\pm2'
        GROQ_API_KEY = 'sk_PIqc0VO5BKrLW1Uc1PB5WGdyb3FY6dggS9tpowHCEFfGE9DjHeM6'
        JWT_SECRET = 'mySuperSecretKey_1234567890_ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        PORT = '5000'
    }

    stages {

        stage('Install Backend') {
            steps {
                dir('server') {
                    bat 'call npm install'
                }
            }
        }

        stage('Install Frontend') {
            steps {
                dir('client') {
                    bat 'call npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('client') {
                    bat 'call npm run build'
                }
            }
        }

        stage('Run Backend') {
            steps {
                dir('server') {
                    bat '''
                    set PM2_HOME=C:\\pm2
                    npx pm2 delete server || exit 0
                    npx pm2 start index.js --name server
                    '''
                }
            }
        }

        stage('Serve Frontend') {
        steps {
        dir('client') {
            bat '''
            set PM2_HOME=C:\\pm2
            npm install -g serve
            npx pm2 delete frontend || exit 0
            npx pm2 start serve --name frontend -- -s dist -l 3000
            '''
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
