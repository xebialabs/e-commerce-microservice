FROM xebialabsunsupported/xl-deploy:8.5.0

COPY default-conf/* /opt/xebialabs/xl-deploy-server/default-conf/

# workarounds for latest fixes

RUN rm -f /opt/xebialabs/xl-deploy-server/lib/provision-8.5.0.jar
COPY lib/provision-8.6.0-SNAPSHOT.jar /opt/xebialabs/xl-deploy-server/lib/

RUN rm -f /opt/xebialabs/xl-deploy-server/default-plugins/xld-aws-plugin-*.xldp
COPY lib/xld-aws-plugin-8.5.1-SNAPSHOT.xldp /opt/xebialabs/xl-deploy-server/default-plugins/
