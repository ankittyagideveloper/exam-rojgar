# Azure AI Foundry Chatbot Setup Guide

## 🚀 Overview

This guide will help you set up Azure OpenAI (AI Foundry) for the Ankit AI chatbot integration in the Exam Rojgaar platform.

---

## 📋 Prerequisites

- Active Azure subscription ([Create free account](https://azure.microsoft.com/free/))
- Access to Azure OpenAI service (may require application approval)
- Basic understanding of Azure Portal

---

## 🔧 Step 1: Create Azure OpenAI Resource

### 1.1 Navigate to Azure Portal

1. Go to [Azure Portal](https://portal.azure.com)
2. Sign in with your Microsoft account

### 1.2 Create New Resource

1. Click **"Create a resource"** (+ icon in top-left)
2. Search for **"Azure OpenAI"**
3. Click **"Create"** on the Azure OpenAI card

### 1.3 Configure Basic Settings

Fill in the following details:

**Project Details:**

- **Subscription**: Select your Azure subscription
- **Resource Group**:
  - Create new: `examrojgar-ai-rg`
  - Or use existing resource group

**Instance Details:**

- **Region**: Choose closest region for best performance
  - Recommended: `East US`, `West Europe`, or `Southeast Asia`
- **Name**: `examrojgar-ai-foundry` (must be globally unique)
- **Pricing Tier**: `Standard S0`

### 1.4 Review and Create

1. Click **"Review + create"**
2. Verify all settings
3. Click **"Create"**
4. Wait 5-10 minutes for deployment to complete

---

## 🤖 Step 2: Deploy a Model

### 2.1 Navigate to Azure OpenAI Studio

1. Go to your newly created Azure OpenAI resource
2. Click **"Go to Azure OpenAI Studio"** button
   - Or visit: [https://oai.azure.com](https://oai.azure.com)

### 2.2 Create Model Deployment

1. In Azure OpenAI Studio, click **"Deployments"** in left sidebar
2. Click **"+ Create new deployment"**

### 2.3 Configure Deployment

**Model Selection:**

- **Select a model**:
  - `gpt-4` (Best quality, higher cost)
  - `gpt-35-turbo` (Recommended - Good balance of quality and cost)
  - `gpt-4o-mini` (Most cost-effective)

**Deployment Configuration:**

- **Deployment name**: `examrojgar-chat`
- **Model version**: Select latest available (e.g., `0125` or `1106`)
- **Deployment type**: `Standard`
- **Tokens per Minute Rate Limit**: `10K` (adjust based on expected traffic)

### 2.4 Deploy

1. Click **"Create"**
2. Wait for deployment to complete (1-2 minutes)
3. Note down the **Deployment name**: `examrojgar-chat`

---

## 🔑 Step 3: Get API Credentials

### 3.1 Access Keys and Endpoint

1. Return to Azure Portal
2. Navigate to your Azure OpenAI resource: `examrojgar-ai-foundry`
3. In left sidebar, click **"Keys and Endpoint"**

### 3.2 Copy Required Information

You'll need three pieces of information:

1. **Endpoint URL**

   ```
   https://examrojgar-ai-foundry.openai.azure.com/
   ```

   (Your actual endpoint will have your resource name)

2. **API Key** (Key 1 or Key 2)

   ```
   ********************************
   ```

   (32-character alphanumeric string)

3. **Deployment Name** (from Step 2.3)
   ```
   examrojgar-chat
   ```

### 3.3 Keep Credentials Secure

⚠️ **IMPORTANT**: Never commit API keys to version control!

---

## 🔐 Step 4: Configure Environment Variables

### 4.1 Create/Update .env File

In your project root, create or update `.env` file:

```env
# Azure OpenAI Configuration
VITE_AZURE_OPENAI_ENDPOINT=https://your-resource-name.openai.azure.com/
VITE_AZURE_OPENAI_KEY=your-api-key-here
VITE_AZURE_OPENAI_DEPLOYMENT=examrojgar-chat
VITE_AZURE_OPENAI_API_VERSION=2024-02-15-preview
```

### 4.2 Update .gitignore

Ensure `.env` is in your `.gitignore` file:

```gitignore
# Environment variables
.env
.env.local
.env.production
```

### 4.3 Verify Configuration

Replace the placeholder values with your actual credentials:

- `your-resource-name` → Your Azure OpenAI resource name
- `your-api-key-here` → Your API Key from Step 3.2

---

## 🧪 Step 5: Test Connection (Optional)

### 5.1 Test in Azure OpenAI Studio

1. Go to Azure OpenAI Studio
2. Click **"Chat"** in left sidebar
3. Select your deployment: `examrojgar-chat`
4. Send a test message: "Hello, can you help me with exam preparation?"
5. Verify you get a response

### 5.2 Test API with cURL

```bash
curl https://YOUR-RESOURCE-NAME.openai.azure.com/openai/deployments/examrojgar-chat/chat/completions?api-version=2024-02-15-preview \
  -H "Content-Type: application/json" \
  -H "api-key: YOUR-API-KEY" \
  -d '{
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "Hello!"}
    ]
  }'
```

---

## 💰 Step 6: Cost Management

### 6.1 Set Up Budget Alerts

1. In Azure Portal, go to **"Cost Management + Billing"**
2. Create a budget alert for your resource group
3. Recommended: Set alert at $10, $50, $100 thresholds

### 6.2 Monitor Usage

- Check **"Metrics"** in your Azure OpenAI resource
- Monitor token usage and API calls
- Review costs regularly in Cost Management

### 6.3 Estimated Costs (as of 2024)

**GPT-3.5-Turbo:**

- Input: ~$0.0005 per 1K tokens
- Output: ~$0.0015 per 1K tokens

**GPT-4:**

- Input: ~$0.03 per 1K tokens
- Output: ~$0.06 per 1K tokens

**Example**: 1000 chat conversations (avg 500 tokens each) with GPT-3.5-Turbo ≈ $0.50

---

## 🔒 Step 7: Security Best Practices

### 7.1 Network Security

- Consider enabling **Private Endpoints** for production
- Configure **Firewall rules** to restrict access
- Use **Managed Identity** for Azure-hosted applications

### 7.2 Key Rotation

- Rotate API keys regularly (every 90 days)
- Use Key 2 while rotating Key 1 to avoid downtime

### 7.3 Access Control

- Use **Azure RBAC** to control who can access the resource
- Assign minimum required permissions
- Enable **Azure AD authentication** when possible

---

## 🐛 Troubleshooting

### Common Issues

**Issue: "Resource not found" error**

- Solution: Verify endpoint URL is correct
- Check resource name matches exactly

**Issue: "Invalid API key" error**

- Solution: Regenerate key in Azure Portal
- Ensure no extra spaces in .env file

**Issue: "Deployment not found" error**

- Solution: Verify deployment name matches exactly
- Check deployment is in "Succeeded" state

**Issue: "Rate limit exceeded" error**

- Solution: Increase TPM limit in deployment settings
- Implement request throttling in application

**Issue: "Model not available in region" error**

- Solution: Choose different region
- Check [model availability](https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/models#model-summary-table-and-region-availability)

---

## 📚 Additional Resources

- [Azure OpenAI Documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Azure OpenAI Quickstart](https://learn.microsoft.com/en-us/azure/ai-services/openai/quickstart)
- [Pricing Calculator](https://azure.microsoft.com/en-us/pricing/calculator/)
- [Azure OpenAI Studio](https://oai.azure.com)
- [Model Availability](https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/models)

---

## ✅ Next Steps

After completing this setup:

1. ✅ Azure OpenAI resource created
2. ✅ Model deployed
3. ✅ Credentials obtained
4. ✅ Environment variables configured

You're now ready to proceed with the chatbot implementation!

---

## 📞 Support

If you encounter issues:

1. Check Azure Service Health
2. Review Azure OpenAI service limits
3. Contact Azure Support through Azure Portal
4. Visit [Azure OpenAI Community](https://techcommunity.microsoft.com/t5/azure-ai-services/ct-p/AzureAIServices)

---

**Last Updated**: June 2026
**Version**: 1.0
