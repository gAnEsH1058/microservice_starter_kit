# Create monitoring dashboard for EKS cluster

```
kubectl create ns monitoring

# Create the operator to instanciate all CRDs
kubectl -n monitoring apply -f ./monitoring/prometheus-operator/

# Deploy monitoring components
kubectl -n monitoring apply -f ./monitoring/node-exporter/
kubectl -n monitoring apply -f ./monitoring/kube-state-metrics/
kubectl -n monitoring apply -f ./monitoring/alertmanager

# Deploy prometheus instance and all the service monitors for targets
kubectl -n monitoring apply -f ./monitoring/prometheus-cluster-monitoring/

# Dashboarding
kubectl -n monitoring create -f ./monitoring/grafana/

```

# Sources
# The source code for monitoring Kubernetes 1.18.4 comes from the [kube-prometheus](https://github.com/prometheus-operator/kube-prometheus/tree/v0.6.0/manifests) v0.6.0 tree