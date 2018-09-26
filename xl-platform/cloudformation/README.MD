## Provision EKS with CloudFormation

aws cloudformation create-stack --stack-name eks-user --template-body file://eks-user.yaml --capabilities "CAPABILITY_NAMED_IAM"
aws cloudformation create-stack --stack-name eks-vpc --template-body file://eks-vpc.yaml
aws cloudformation create-stack --stack-name eks-master --template-body file://eks-master.yaml --capabilities "CAPABILITY_IAM"
aws cloudformation create-stack --stack-name eks-workers --template-body file://eks-workers.yaml --capabilities "CAPABILITY_IAM"


After all 4 stacks are created EKS is ready but we need to add a configmap to EKS cluster so the nodes can join the cluster:

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

**rolearn** is output on the **eks-workers stack**


EKS use case
1 - xl apply infra (aws.cloud and aws.aws.cloudformation.Stack, and env with aws.cloudformation.Stack in it)
2 - xl apply eks stuff (all cloudformation stacks )
3 - deploy the  eks stuf (will end up provisioning all needed infra and will create in xld the k8s.Master)
4 - xl apply config map and deploy the config map so nodes can connect to master (herer we need nodeRole ARN and  username and user ARN )
5 - xl apply xld-ecommerce-stateful-svc
6 - xl apply xld-ecommerce-stateless-svc
7 - deploy store app

