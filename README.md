# 🚦 Intelligent Traffic Management DevOps Project

A complete DevOps-based traffic monitoring platform that simulates traffic sensor data, processes it through backend services, and visualizes traffic analytics in real time.

This project demonstrates a full DevOps workflow including infrastructure provisioning, containerization, CI/CD automation, Kubernetes orchestration, and monitoring.

---

# 🏗️ System Architecture

![Architecture](docs/images/arch.png)

Workflow:

Developer → GitHub → Jenkins → Docker → Kubernetes → Prometheus → Grafana

---

# ⚙️ Tech Stack

Backend: Python (FastAPI)

Frontend: HTML / CSS / JavaScript

Containerization: Docker

Orchestration: Kubernetes

CI/CD: Jenkins

Infrastructure as Code: Terraform

Configuration Management: Ansible

Monitoring: Prometheus & Grafana

Cloud Provider: AWS EC2

Reverse Proxy: Nginx

Version Control: Git & GitHub

---

# ⚙️ Setup & Running

Install dependencies




cd services/traffic-api
pip install fastapi uvicorn


Start backend




uvicorn main:app --reload --port 8000


Run dashboard

Open:



services/dashboard/index.html


---

# ☁️ Infrastructure Deployment

Provision infrastructure using Terraform
cd terraform

terraform init
terraform plan
terraform apply


---

Configure servers using Ansible



cd ansible

ansible-playbook setup.yml


---

Deploy application to Kubernetes



cd kubernetes

kubectl apply -f .


---

Verify deployment



kubectl get pods
kubectl get svc


Expected services

traffic-api  
traffic-dashboard  
nginx-proxy  

---

# 📊 API Documentation (FastAPI)

The backend API is built using FastAPI and exposes endpoints for traffic analytics.

![FastAPI Docs](docs/images/fastapi-docs.png)

Main endpoints



/traffic
/traffic/congestion
/metrics


---

# 📈 Prometheus Monitoring

Prometheus collects metrics from the API and system exporters.

![Prometheus Targets](docs/images/prometheus-targets.png)

Access Prometheus



http://50.19.101.138:9090


---

# 📊 Grafana Dashboard

Grafana visualizes metrics collected by Prometheus.

The dashboards display system performance and traffic analytics.

![Grafana Dashboard](docs/images/grafana-metrics.png)

Access Grafana
http://50.19.101.138:3000

---

# 🖥️ Node Exporter Dashboard

Node Exporter is used to monitor server resources.

Metrics include:

CPU usage  
Memory usage  
Disk usage  

![Node Exporter Dashboard](docs/images/node-exporter-dashboard.png)

---

# 🚦 Traffic Monitoring Dashboard

The frontend dashboard displays traffic congestion analytics.

![Traffic Dashboard](docs/images/traffic-dashboard.png)

Dashboard features

Traffic congestion statistics  
Vehicle processing metrics  
Traffic flow analytics  
Real-time visualization  

---

# 🔄 CI/CD Pipeline

CI/CD pipeline implemented using Jenkins.

Pipeline workflow

1 Pull source code from GitHub  
2 Build Docker images  
3 Push images  
4 Deploy to Kubernetes  
5 Monitor services using Prometheus & Grafana  

This ensures automated and reliable deployments.

---

# 📂 Project Structure



intelligent-traffic-devops

ansible
kubernetes
monitoring
services
terraform

docs
images

---

# Conclusion

This project demonstrates the implementation of a complete DevOps workflow through building and deploying an Intelligent Traffic Management System.

The system simulates traffic data processing and provides real-time visualization through a traffic monitoring dashboard. The backend service was developed using FastAPI, while the frontend dashboard was built using HTML, CSS, and JavaScript.

Several DevOps practices were applied including containerization with Docker, automated CI/CD pipelines with Jenkins, and orchestration with Kubernetes.

Infrastructure provisioning was automated using Terraform, while server configuration was handled using Ansible.

Monitoring and observability were implemented using Prometheus and Grafana to track system performance and service health.

This project demonstrates practical experience in building and managing scalable cloud-native applications using modern DevOps tools.

---

# 👨‍💻 Author

Ahmed Hamed

DevOps & Cloud Engineer

GitHub

https://github.com/ahmed1707hamed-tech


