# Cloud-Native Task Management System - DevOps Portfolio

A production-ready, cloud-native application demonstrating **infrastructure automation, DevOps practices, and platform engineering** capabilities using Azure services.

## 🏗️ Infrastructure & DevOps Focus

This project showcases enterprise-level DevOps and cloud infrastructure skills through:

### Infrastructure as Code & Cloud Architecture
- **Azure Resource Management**: Automated provisioning of multi-tier cloud infrastructure
- **Serverless Architecture**: Azure Functions for cost-effective, auto-scaling compute
- **Managed Database**: Azure SQL Database with automated backups and scaling
- **Global Content Delivery**: Azure Static Web Apps with CDN distribution
- **Resource Optimization**: Cost-effective architecture (~$7/month total cost)

### DevOps & CI/CD Pipeline
- **Automated Deployment**: GitHub Actions for both frontend and backend
- **Environment Management**: Separate development/production configurations  
- **Security Best Practices**: Credentials managed via GitHub Secrets and Azure Key Vault
- **Code Quality**: TypeScript compilation, testing, and build validation
- **Infrastructure Monitoring**: Application Insights integration

### Platform Engineering
- **Multi-Region Deployment**: Australia Southeast (backend) + East Asia (frontend)
- **Cross-Origin Security**: Properly configured CORS policies
- **Error Handling & Resilience**: Database retry logic and connection pooling
- **Scalability Design**: Serverless functions that scale automatically with demand

## Live Demo
- **Application**: https://ambitious-ground-00a372300.2.azurestaticapps.net
- **API Health Check**: https://func-taskapp-35783.azurewebsites.net/api/health

## Architecture Diagram
```bash
┌─────────────────────────────────────────────────────┐
│                    GitHub Actions CI/CD             │
├─────────────────────────────────────────────────────┤
│  Frontend Pipeline          │  Backend Pipeline     │
│  ├─ Build React/TypeScript  │  ├─ Build .NET Core   │
│  ├─ Run Tests               │  ├─ Run Tests         │
│  └─ Deploy to Static Apps   │  └─ Deploy Functions  │
└─────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────┐
│                 Azure Cloud Platform                 │
├──────────────────────────────────────────────────────┤
│  ┌─────────────────────┐    ┌───────────────────────┐│
│  │  Static Web Apps    │    │   Azure Functions     ││
│  │  (East Asia)        │    │   (Australia SE)      ││
│  │  - Global CDN       │◄──►│   - Serverless Compute││
│  │  - Auto HTTPS       │    │   - Auto-scaling      ││
│  └─────────────────────┘    └───────────────────────┘│
│             │                          │             │
│             └────────────┬─────────────┘             │
│                          ▼                           │
│  ┌─────────────────────────────────────────────────┐ │
│  │         Azure SQL Database                      │ │
│  │         (Australia Southeast)                   │ │
│  │  - Managed backups    - Query optimization      │ │
│  │  - Automatic scaling  - Security patching       │ │
│  └─────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘
```

## Infrastructure Specifications

### Compute Resources
- **Azure Functions**: Consumption plan, auto-scaling serverless compute
- **Runtime**: .NET 8 on Azure Functions v4
- **Concurrency**: Handles up to 200 concurrent requests per instance

### Database & Storage
- **Azure SQL Database**: Basic tier, 2GB storage with automatic backups
- **Connection Pooling**: Entity Framework with retry logic for transient failures
- **Data Security**: Encrypted connections, parameterized queries, RBAC

### Networking & Security
- **HTTPS Everywhere**: TLS 1.3 encryption for all communications
- **CORS Configuration**: Properly configured cross-origin access
- **Firewall Rules**: Database accessible only from Azure Functions
- **Secrets Management**: No credentials in source code, Azure App Settings integration

### Monitoring & Observability  
- **Application Insights**: Performance monitoring, dependency tracking
- **Health Checks**: Automated endpoint monitoring
- **Error Tracking**: Centralized logging and alerting
- **Cost Monitoring**: Budget alerts and resource optimization

## Skills Demonstrated

### Cloud Architecture & Design
- Multi-tier application design
- Serverless architecture patterns  
- Cost optimization strategies
- Cross-region deployment considerations

### Infrastructure Automation
- Azure CLI scripting for resource provisioning
- GitHub Actions workflow automation
- Environment configuration management
- Automated deployment pipelines

### DevOps Engineering
- CI/CD pipeline design and implementation
- Code quality gates and testing integration
- Infrastructure as Code principles
- Security-first deployment practices

### Platform Operations
- Monitoring and alerting setup
- Performance optimization
- Disaster recovery considerations
- Scalability planning and implementation

## Technical Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | React + TypeScript + Vite | Modern web application |
| API | .NET 8 + Azure Functions | Serverless business logic |
| Database | Azure SQL Database | Managed relational data |
| Hosting | Azure Static Web Apps | Global content delivery |
| CI/CD | GitHub Actions | Automated deployment |
| Monitoring | Application Insights | Performance tracking |
| Security | Azure Key Vault + Secrets | Credential management |

## Cost Analysis
**Monthly Operating Cost: ~$7 AUD**
- Azure SQL Database (Basic): $5/month
- Azure Functions (Consumption): $1-2/month  
- Static Web Apps: Free tier
- Application Insights: Free tier (5GB/month)

*Cost-effective architecture suitable for small to medium workloads*

## Contact
**PJ Faraon** - DevOps Engineer & Platform Specialist  
📧 pjcloudapps@gmail.com  
🔗 LinkedIn: https://www.linkedin.com/in/pjfaraon/ 
💻 GitHub: https://github.com/philipjohn05/taskapp-portfolio

---

*This project demonstrates practical experience with cloud architecture, DevOps automation, and platform engineering - skills directly applicable to infrastructure and platform engineering roles.*
