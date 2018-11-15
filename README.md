## e-commerce microservice application on AWS EKS 

The blueprint deploys an e-commerce microservice created using JHipster to AWS EKS.
XL deploy does the provisioning and deployment, while XL release orchestrates everything.

### Prerequisites.

1. Git clone [https://github.com/xebialabs/e-commerce-microservice/tree/blueprint-demo](https://github.com/xebialabs/e-commerce-microservice/tree/blueprint-demo)
2. Generate the blueprint with `xl blueprint -t aws/microservice-ecommerce`


To deploy this blueprint with XL Platform follow the below steps

1. Move the `kubernetes` folder from the root directory into the xebialabs folder created by blueprint
2. Apply the generated yaml configurations

    ```
    xl apply -f xebialabs.yaml
    ```

3. Go to XL Release and look for the test-elton-release-pipeline and start a new release from it.