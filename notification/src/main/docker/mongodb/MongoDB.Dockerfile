FROM mongo:4.0.2
ADD mongodb/scripts/init_replicaset.js init_replicaset.js
