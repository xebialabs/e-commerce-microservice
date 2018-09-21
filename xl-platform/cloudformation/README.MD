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

