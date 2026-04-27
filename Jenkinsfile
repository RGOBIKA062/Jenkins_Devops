pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
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
            bat 'set PM2_HOME=C:\\pm2'
            bat 'npx pm2 delete server || exit 0'
            bat 'npx pm2 start index.js --name server'
        }
    }
}

       stage('Serve Frontend') {
    steps {
        dir('client') {
            bat 'set PM2_HOME=C:\\pm2'
            bat 'npx pm2 delete frontend || exit 0'
            bat 'npx pm2 start "npx serve -s build -l 3000" --name frontend'
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
