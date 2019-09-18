## e-commerce microservice application on AWS EKS

The blueprint deploys an e-commerce microservice created using JHipster to AWS EKS.
XL Deploy does the provisioning and deployment, while XL Release orchestrates everything.

### Prerequisites

1. If you do not have XL Release and XL Deploy instances running, you can use this Docker Compose setup to spin them up. The setup also contains a preconfigured Jenkins instance.
Please note that you need to obtain a trial license or bring your own license for XL Release and XL Deploy. Follow the steps below to use the Docker Compose files.

    1. Download the contents of https://github.com/xebialabs/e-commerce-microservice/tree/master/docker-compose/xebialabs into a folder such as `xl-platform`.
    2. Copy the license for XL Release into `xl-platform/xl-release/default-conf/` and the license for XL Deploy into `xl-platform/xl-deploy/default-conf/`.
    3. Run `docker-compose up --build` on the `xl-platform` folder.

2. Git clone [https://github.com/xebialabs/e-commerce-microservice/tree/blueprint-demo](https://github.com/xebialabs/e-commerce-microservice/tree/blueprint-demo).
3. Generate the blueprint with `xl blueprint -t aws/microservice-ecommerce`.


To deploy this blueprint with the XebiaLabs DevOps Platform, follow the steps below:

1. Apply the generated YAML configurations using the XL CLI.

    ```
    xl apply -f xebialabs.yaml
    ```

2. Go to XL Release, look for the "e-commerce-ci-cd" template, and start a new release from it.