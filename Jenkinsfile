#!/usr/bin/env groovy
pipeline {
    agent any
    environment {
        XL_VALUE_BUILD_ID = "1.0.${env.BUILD_ID}"

        XL_DEPLOY_URL = "http://xl-deploy:4516"
        XL_DEPLOY_CREDENTIALS = credentials("xld-credentials")
    }

    stages {
        stage ("checkout") {
            steps {
                checkout scm
            }
        }
        stage ("push xld package") {
            steps {
                sh "./xlw apply -f xebialabs/xld-kubernetes-apps.yaml"
            }
        }

    }
}
