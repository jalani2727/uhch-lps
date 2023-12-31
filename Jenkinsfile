pipeline {
    agent any
    stages {
        stage('Compile') {
            steps {
                nodejs('Node') {
                    sh 'npm config set registry http://repo1.uhc.com/artifactory/api/npm/npm-virtual'
                    sh 'npm install'
                    sh 'npm --prefix ecom/sfra-webpack-builder/ install'
                    sh 'npm --prefix ecom/sfra-webpack-builder/ run npmInstall'
                    sh 'npm --prefix ecom/sfra-webpack-builder/ run prod'
                    sh 'npm --prefix ecom/storefront-reference-architecture/ run compile:fonts'
                }
            }
        }
        stage('Validate') {
            steps {
                nodejs('Node') {
                    sh 'npm --prefix ecom/storefront-reference-architecture/ run lint'
                    sh 'npm --prefix ecom/united-health-care/ run lint'
                    sh 'npm --prefix ecom/abode_datalayer/ run lint'
                    sh 'npm --prefix ecom/payment-portal-integration/ run lint'
                    sh 'npm --prefix ecom/storefront-reference-architecture/ run test'
                }
            }
        }
        stage('Files for upload') {
            steps {
                nodejs('Node') {
                    sh 'mkdir SFCC_UHCH_${BUILD_NUMBER}'
                    sh 'cp -r ecom/storefront-reference-architecture/cartridges/* SFCC_UHCH_${BUILD_NUMBER}'
                    sh 'cp -r ecom/dis-product-image-wrapper/cartridges/* SFCC_UHCH_${BUILD_NUMBER}'
                    sh 'cp -r ecom/marketing-cloud-connector/cartridges/* SFCC_UHCH_${BUILD_NUMBER}'
                    sh 'cp -r ecom/marketing-cloud-connector-custom/cartridges/* SFCC_UHCH_${BUILD_NUMBER}'
                    sh 'cp -r ecom/plugin_ordermanagement/cartridges/* SFCC_UHCH_${BUILD_NUMBER}'
                    sh 'cp -r ecom/plugin_sitemap/cartridges/* SFCC_UHCH_${BUILD_NUMBER}'
                    sh 'cp -r ecom/united-health-care/cartridges/* SFCC_UHCH_${BUILD_NUMBER}'
                    sh 'cp -r ecom/job-components/cartridges/* SFCC_UHCH_${BUILD_NUMBER}'
                    sh 'cp -r ecom/job-components-custom/cartridges/* SFCC_UHCH_${BUILD_NUMBER}'
                    sh 'cp -r ecom/upg-payment/cartridges/* SFCC_UHCH_${BUILD_NUMBER}'
                    sh 'cp -r ecom/ups-address-validation/cartridges/* SFCC_UHCH_${BUILD_NUMBER}'
                    sh 'cp -r ecom/ease-integration/cartridges/* SFCC_UHCH_${BUILD_NUMBER}'
                    sh 'cp -r ecom/abode_datalayer/cartridges/* SFCC_UHCH_${BUILD_NUMBER}'
                    sh 'cp -r ecom/payment-portal-integration/cartridges/* SFCC_UHCH_${BUILD_NUMBER}'
                    sh 'zip -r SFCC_UHCH_${BUILD_NUMBER}.zip SFCC_UHCH_${BUILD_NUMBER}'
                }
            }
        }
        // stage('Deploy Code in CICD') {
        //      steps {
        //          nodejs('Node') {
        //              sh 'node_modules/.bin/sfcc-ci client:auth ${API_KEY} ${API_SECRET}'
        //              sh 'node_modules/.bin/sfcc-ci code:deploy SFCC_UHCH_${BUILD_NUMBER}.zip -i ${DEV_HOSTNAME}'
        //              sh 'node_modules/.bin/sfcc-ci code:activate SFCC_UHCH_${BUILD_NUMBER} -i ${DEV_HOSTNAME}'
        //          }
        //      }
        // }
        stage('Deploy Code in Staging') {
            steps {
                nodejs('Node') {
                    sh 'node_modules/.bin/sfcc-ci client:auth ${API_KEY} ${API_SECRET}'
                    sh 'node_modules/.bin/sfcc-ci code:deploy SFCC_UHCH_${BUILD_NUMBER}.zip -i ${STAGE_CERT} --passphrase ${STAGE_PASS_PHRASE} --certificate senthilvadivel.p12'
                    sh 'node_modules/.bin/sfcc-ci code:activate SFCC_UHCH_${BUILD_NUMBER} -i ${STAGE_SANDBOX}'
                }
            }
        }
        // stage('Deploy Code in Staging Test Realm') {
        //     steps {
        //         nodejs('Node') {
        //             sh 'node_modules/.bin/sfcc-ci client:auth ${API_KEY} ${API_SECRET}'
        //             sh 'node_modules/.bin/sfcc-ci code:deploy SFCC_UHCH_${BUILD_NUMBER}.zip -i ${STAGE_TEST_CERT} --passphrase ${STAGE_TEST_PASS_PHRASE} --certificate suresh_kumar2@optum.com.p12'
        //             sh 'node_modules/.bin/sfcc-ci code:activate SFCC_UHCH_${BUILD_NUMBER} -i ${STAGE_TEST_SANDBOX}'
        //         }
        //     }
        // }
        // stage('Deploy Code in QA') {
        //    steps {
        //       nodejs('Node') {
        //            sh 'node_modules/.bin/sfcc-ci client:auth ${API_KEY} ${API_SECRET}'
        //            sh 'node_modules/.bin/sfcc-ci code:deploy SFCC_UHCH_${BUILD_NUMBER}.zip -i ${DEVELOPMENT_SANDBOX}'
        //           sh 'node_modules/.bin/sfcc-ci code:activate SFCC_UHCH_${BUILD_NUMBER} -i ${DEVELOPMENT_SANDBOX}'
        //       }
        //    }
        // }
        stage('Cleanup') {
            steps {
                cleanWs()
            }
        }
    }
}
