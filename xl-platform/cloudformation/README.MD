## Provision EKS with official AWS docs approach
1. Download and configure aws-cli with your credentials and profile configuration.
2. Create VPC, Subnet(s), Security Group, Route(s) and add them to RouteTable(s) or use existent ones.
3. Create Amazon EKS service IAM role to apply to your cluster.
4. Create Amazon EKS Cluster (kubernetes master) from Amazon EKS console.
5. Download and install kubectl.
6. Download and install aws-iam-authenticator. You're required to pass up to 5 steps.
7. Configure kubectl by editing kubeconfig file to connect to EKS master using aws-iam-authenticator as a token generator.
8. Launch worker nodes from CloudFormation template and provide custom parameters.
9. Download and edit ConfigMap with required values.
10. Deploy ConfigMap via kubectl so worker nodes can join EKS cluster.

## Provision EKS with CloudFormation

You may provision all required parts from CloudFormation:
- Create EKS cluster user:
```
aws cloudformation create-stack --stack-name eks-user --template-body file://eks-user.yaml --capabilities "CAPABILITY_NAMED_IAM"
```
- Create VPC and related network resources:
```
aws cloudformation create-stack --stack-name eks-vpc --template-body file://eks-vpc.yaml
```
- Create EKS cluster master:
```
aws cloudformation create-stack --stack-name eks-master --template-body file://eks-master.yaml --capabilities "CAPABILITY_IAM"
```
- Create EKS worker nodes:
```
aws cloudformation create-stack --stack-name eks-workers --template-body file://eks-workers.yaml --capabilities "CAPABILITY_IAM"
```

- After all 4 stacks are created EKS is ready but we need to add a ConfigMap to EKS cluster so the nodes can join the cluster:

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: aws-auth
  namespace: kube-system
data:
  mapRoles: |
    - rolearn: <ARN of instance role (not instance profile)> 
      username: system:node:{{EC2PrivateDNSName}}
      groups:
        - system:bootstrappers
        - system:nodes
  mapUsers: |
    - userarn: <ARN of additional user's IAM>
      username: <Username>
      groups:
        - system:masters    

```

**rolearn** is output on the **eks-workers** cloudformation stack.

## Provision EKS with XL Deploy

You may easily provision and deploy application(i.e. microservice application) through XL Deploy. Specify secrets file with your AWS IAM user credentials inside and upload template to XL Deploy:
```
xl apply --secret-file=secrets.file -f xld-ecommerce-microservice.yaml
```

## EKS use case (internal usage)
- xl apply infra (aws.cloud and aws.aws.cloudformation.Stack, and env with aws.cloudformation.Stack in it)
- xl apply eks stuff (all cloudformation stacks )
- deploy the  eks stuf (will end up provisioning all needed infra and will create in xld the k8s.Master)
- xl apply config map and deploy tlhe config map so nodes can connect to master (herer we need nodeRole ARN and  username and user ARN )
- xl apply xld-ecommerce-stateful-svc
- xl apply xld-ecommerce-stateless-svc
- deploy store app

