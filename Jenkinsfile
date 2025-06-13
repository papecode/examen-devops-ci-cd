pipeline {
    agent any

    tools {
        jdk 'jdk17'
        maven 'maven3'
        nodejs 'node20'
    }

    environment {
        DOCKER_REGISTRY = 'papesaliouwade'
        DOCKER_CREDENTIALS = 'docker-cred'

        DB_NAME = 'dbcontact'
        DB_USER = 'root'
        DB_ROOT_PASSWORD = credentials('dbpassword-cred')

        APP_VERSION = "${env.BUILD_NUMBER}"
        FRONTEND_VERSION = "${env.BUILD_NUMBER}"

        BACKEND_URL = 'http://springboot-app:8082'
        FRONTEND_PORT = '80'
    }

    stages {
        stage('Vérification du code') {
            steps {
                git branch: 'master',
                    credentialsId: 'git-cred',
                    url: 'https://github.com/papecode/examen-devops-ci-cd.git'

                script {
                    if (!fileExists('backend') || !fileExists('frontend')) {
                        error("Structure de projet incorrecte. Les dossiers 'backend' et 'frontend' doivent exister.")
                    }
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'chmod +x mvnw'
                    sh './mvnw clean package -DskipTests'
                    archiveArtifacts artifacts: 'target/*.jar', fingerprint: true
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build --configuration=production'
                    archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
                }
            }
        }

        stage('Construction des images Docker') {
            steps {
                script {
                    dir('backend') {
                        // Copier le jar dans un sous-dossier accessible pour docker build
                        sh 'cp target/*.jar .'

                        // Construire l’image en précisant bien le chemin du Dockerfile et du contexte
                        docker.build("${DOCKER_REGISTRY}/pipe_spring-app:${APP_VERSION}", "-f Dockerfile .")
                    }

                    dir('frontend') {
                        docker.build("${DOCKER_REGISTRY}/angularfront:${FRONTEND_VERSION}", "-f Dockerfile .")
                    }
                }
            }
        }

        stage('Push des images Docker') {
            steps {
                script {
                    withDockerRegistry([credentialsId: DOCKER_CREDENTIALS, url: '']) {
                        sh "docker push ${DOCKER_REGISTRY}/pipe_spring-app:${APP_VERSION}"
                        sh "docker push ${DOCKER_REGISTRY}/angularfront:${FRONTEND_VERSION}"

                        sh "docker tag ${DOCKER_REGISTRY}/pipe_spring-app:${APP_VERSION} ${DOCKER_REGISTRY}/pipe_spring-app:latest"
                        sh "docker tag ${DOCKER_REGISTRY}/angularfront:${FRONTEND_VERSION} ${DOCKER_REGISTRY}/angularfront:latest"
                        sh "docker push ${DOCKER_REGISTRY}/pipe_spring-app:latest"
                        sh "docker push ${DOCKER_REGISTRY}/angularfront:latest"
                    }
                }
            }
        }

        stage('Déploiement') {
            steps {
                script {
                    sh 'docker-compose down || true'

                    withEnv([
                        "APP_VERSION=${APP_VERSION}",
                        "FRONTEND_VERSION=${FRONTEND_VERSION}",
                        "DB_NAME=${DB_NAME}",
                        "DB_USER=${DB_USER}",
                        "DB_ROOT_PASSWORD=${DB_ROOT_PASSWORD}"
                    ]) {
                        sh 'docker-compose up -d'
                    }

                    sh 'sleep 30'
                    sh 'docker ps'
                    sh 'curl -I http://localhost:8082/actuator/health'
                }
            }
        }

        stage('Tests E2E') {
            steps {
                script {
                    echo "Exécution des tests de bout en bout..."
                }
            }
        }
    }

    post {
        success {
            emailext(
                subject: "SUCCESS: ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}",
                body: """<p>Le build ${env.BUILD_NUMBER} du job ${env.JOB_NAME} a réussi.</p>
                       <p>Consultez les détails ici: <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>""",
                to: 'papesaliouwade500@gmail.com',
                mimeType: 'text/html'
            )
        }
        failure {
            emailext(
                subject: "FAILED: ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}",
                body: """<p>Le build ${env.BUILD_NUMBER} du job ${env.JOB_NAME} a échoué.</p>
                       <p>Consultez les détails ici: <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>""",
                to: 'papesaliouwade500@gmail.com',
                mimeType: 'text/html'
            )
        }
        //always {
        //    junit '**/target/surefire-reports/*.xml'
        //    junit 'frontend/test-results/**/*.xml'
        //    archiveArtifacts artifacts: '**/target/*.jar,frontend/dist/**/*'
        //    cleanWs()
        //}
    }
}
