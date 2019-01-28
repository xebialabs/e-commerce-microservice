FROM xebialabsunsupported/xl-deploy:8.5.0

COPY default-conf/* /opt/xebialabs/xl-deploy-server/default-conf/

# workarounds to get Terraform working

RUN rm -f /opt/xebialabs/xl-deploy-server/lib/provision-8.5.0.jar
COPY lib/provision-8.6.0-SNAPSHOT.jar /opt/xebialabs/xl-deploy-server/lib/

RUN rm -f /opt/xebialabs/xl-deploy-server/default-plugins/xld-terraform-plugin-*.xldp
COPY lib/xld-terraform-plugin-8.0.1-SNAPSHOT.xldp /opt/xebialabs/xl-deploy-server/default-plugins/

COPY terraform/terraform /usr/local/bin/terraform
USER root
RUN chmod +x /usr/local/bin/terraform