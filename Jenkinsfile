// Pipeline del frontend (front-seminario).
// Va en la raiz del repo FrontSeminario. Job tipo "Pipeline" -> Script Path: Jenkinsfile.front
//
// Resuelve el problema del environment: como environment.production.ts esta
// vacio en el repo, aca lo REESCRIBIMOS en el checkout con las URLs del entorno
// elegido, y buildeamos con el --base-href correspondiente.
pipeline {
  agent any

  parameters {
    choice(name: 'DEPLOY_ENV', choices: ['test', 'prod'],
           description: 'Entorno a desplegar')
  }

  environment {
    IMAGE = 'seminario-front'
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Resolver entorno') {
      steps {
        script {
          if (params.DEPLOY_ENV == 'prod') {
            env.CONTAINER  = 'seminario-front'
            env.HOST_PORT  = '5006'
            env.BASE_HREF  = '/lognet-app/'
            env.BUILD_CONFIGURATION = 'production'
          } else {
            env.CONTAINER  = 'seminario-front-test'
            env.HOST_PORT  = '5008'
            env.BASE_HREF  = '/lognet-test/'
            env.BUILD_CONFIGURATION = 'development'
          }
        }
      }
    }

    stage('Build imagen') {
      steps {
        sh '''
            docker build \
              --build-arg BUILD_CONFIGURATION=${BUILD_CONFIGURATION} \
              --build-arg BASE_HREF=${BASE_HREF} \
              -t ${IMAGE}:${DEPLOY_ENV} .
          '''
      }
    }

    stage('Desplegar') {
      steps {
        sh '''
          docker rm -f ${CONTAINER} || true
          docker run -d \
            --name ${CONTAINER} \
            --restart unless-stopped \
            -p 127.0.0.1:${HOST_PORT}:8080 \
            ${IMAGE}:${DEPLOY_ENV}
        '''
      }
    }
  }

  post {
    success { echo "Front ${params.DEPLOY_ENV} arriba en 127.0.0.1:${env.HOST_PORT} (base-href ${env.BASE_HREF})" }
    failure { echo "Fallo el deploy del front ${params.DEPLOY_ENV}" }
  }
}