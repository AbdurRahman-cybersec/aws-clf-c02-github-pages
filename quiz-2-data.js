(function () {
  const SOURCE = "---\nlayout: exam\n---\n\n# Quiz 2.0\n\n1. A change or failure in one component should not cascade to other components.\n    Answer: Loose coupling\n\n2. A gateway that enables Amazon EC2 instances in a public subnet to connect to the public internet.\n    Answer: Internet Gateway\n\n3. A gateway that enables EC2 instances in a private subnet to connect to the public internet.\n    Answer: NAT Gateway\n\n4. A security management tool used to configure AWS WAF rules across accounts.\n    Answer: AWS Firewall Manager\n\n5. Provides compliance-related documents such as Service Organization Control (SOC) reports.\n    Answer: AWS Artifact\n\n6. An IAM identity that uses access keys to manage cloud resources through the AWS CLI.\n    Answer: IAM User\n\n7. An IAM identity that grants temporary access to AWS resources.\n    Answer: IAM Role\n\n8. Manages common access permissions for a large number of IAM users.\n    Answer: IAM Group\n\n9. A resource-based policy used to grant permissions to an S3 bucket and its objects.\n    Answer: Bucket Policy\n\n10. Provides AWS credentials that grant application users access to other AWS services.\n    Answer: Amazon Cognito Identity Pools\n\n11. Discovers, classifies, and helps protect sensitive data such as PII or intellectual property.\n    Answer: Amazon Macie\n\n12. A threat-detection service that continuously monitors for malicious activity in an AWS account.\n    Answer: Amazon GuardDuty\n\n13. An authentication method that can prevent unauthorized deletion of protected Amazon S3 objects.\n    Answer: Multi-Factor Authentication (MFA)\n\n14. A virtual firewall that controls traffic at the EC2 instance level.\n    Answer: Security Group\n\n15. An automated security-assessment service that improves the security and compliance of applications.\n    Answer: Amazon Inspector\n\n16. Uses the AWS global network and anycast static IP addresses to improve application availability and performance.\n    Answer: AWS Global Accelerator\n\n17. A secure data-transport service used to move petabyte-scale data into and out of AWS.\n    Answer: AWS Snowball\n\n18. Continuously records account activity, including actions performed through the AWS Management Console and SDKs.\n    Answer: AWS CloudTrail\n\n19. A source-control service for hosting Git-based repositories.\n    Answer: AWS CodeCommit\n\n20. An EC2 option that supports existing server-bound software licenses.\n    Answer: Dedicated Host\n\n21. A highly available and scalable cloud DNS service.\n    Answer: Amazon Route 53\n\n22. Automatically adjusts the capacity of AWS resources based on demand.\n    Answer: AWS Auto Scaling\n\n23. Automatically transfers infrequently accessed S3 data to a more cost-effective storage class.\n    Answer: S3 Lifecycle Policy\n\n24. A designated technical point of contact who helps maintain an operationally healthy AWS environment.\n    Answer: Technical Account Manager (TAM)\n\n25. Inspects an AWS environment and recommends improvements based on AWS best practices.\n    Answer: AWS Trusted Advisor\n\n26. Lets you set coverage targets and receive alerts when utilization falls below them.\n    Answer: AWS Budgets\n\n27. A Reserved Instance type that allows changes to instance family, instance type, platform, scope, or tenancy.\n    Answer: Convertible RI\n\n28. Forecasts future AWS costs and usage based on past consumption.\n    Answer: AWS Cost Explorer\n\n29. Categorizes and tracks AWS costs at a detailed level.\n    Answer: Cost allocation tags\n\n30. The most cost-effective payment option in this set when purchasing a Reserved Instance for a one-year term.\n    Answer: All Upfront\n\n31. A managed service that simplifies deploying, operating, and scaling distributed in-memory caches.\n    Answer: Amazon ElastiCache\n\n32. A managed migration and replication service for moving database and analytics workloads to AWS with minimal downtime.\n    Answer: AWS Database Migration Service (AWS DMS)\n\n33. Provides a dedicated 1 Gbps or 10 Gbps fiber connection between an on-premises location and AWS without using the public internet path.\n    Answer: AWS Direct Connect\n\n34. A machine learning service that adds image and video analysis to applications.\n    Answer: Amazon Rekognition\n\n35. Helps analyze distributed application behavior through profiling, exception collection, and request tracing.\n    Answer: AWS X-Ray\n\n36. Data associated with an EC2 instance that applications can use to configure or manage the instance while it runs.\n    Answer: Instance metadata\n\n37. Accelerates delivery of dynamic and static web content such as images, JavaScript, CSS, and HTML.\n    Answer: Amazon CloudFront\n\n38. Defines and deploys AWS resources using infrastructure as code.\n    Answer: AWS CloudFormation\n\n39. Creates, manages, and controls cryptographic keys for AWS services and applications.\n    Answer: AWS Key Management Service (AWS KMS)\n\n40. A serverless, fully managed NoSQL key-value database for high-performance applications at any scale.\n    Answer: Amazon DynamoDB\n\n41. Estimates the overall expense of operating applications in the AWS Cloud compared with on premises.\n    Answer: AWS Total Cost of Ownership (TCO) Calculator\n\n42. Uses unused EC2 capacity and can provide up to a 90% discount compared with On-Demand pricing.\n    Answer: Spot Instance\n\n43. Consolidates multiple AWS accounts into a centrally managed organization with organizational units.\n    Answer: AWS Organizations\n\n44. Provides cost-effective long-term archival storage with expedited, standard, and bulk retrieval options.\n    Answer: Amazon Glacier\n\n45. A platform where vendors can sell a catalog of custom AMIs and other solutions.\n    Answer: AWS Marketplace\n\n46. An S3 feature that uploads one object as independently uploaded contiguous parts.\n    Answer: Multipart Upload\n\n47. Combines payment for multiple AWS accounts into one payment method and summarizes their usage and costs.\n    Answer: Consolidated Billing\n\n48. Provides detailed AWS resource-usage and estimated-charge data for an account.\n    Answer: AWS Cost and Usage Reports\n\n49. Distributes incoming traffic across healthy targets and scales load-balancing capacity as traffic changes.\n    Answer: Elastic Load Balancer (ELB)\n\n50. Geographic areas containing AWS infrastructure that let customers place applications closer to users or meet compliance requirements.\n    Answer: AWS Regions\n\n51. One or more discrete data centers with redundant power, networking, and connectivity in separate facilities.\n    Answer: Availability Zones\n\n52. Region-scoped machine images whose copies can be created in other AWS Regions.\n    Answer: Amazon Machine Images (AMIs)\n\n53. An interactive query service that uses SQL to analyze data directly in Amazon S3 and other data sources.\n    Answer: Amazon Athena\n\n54. A Well-Architected pillar focused on developing, running, monitoring, and continuously improving workloads and supporting processes.\n    Answer: Operational Excellence\n\n55. An object-storage service that stores objects in buckets.\n    Answer: Amazon Simple Storage Service (Amazon S3)\n\n56. Displays metrics, creates alarms, sends notifications, and can trigger changes when monitored thresholds are breached.\n    Answer: Amazon CloudWatch\n\n57. Extends CloudWatch Events capabilities and connects data from AWS services, applications, and third-party SaaS applications.\n    Answer: Amazon EventBridge\n\n58. Helps investigate security findings and identify their root cause.\n    Answer: Amazon Detective\n\n59. A managed DDoS protection service for applications running on AWS.\n    Answer: AWS Shield\n\n60. Lets you create rules that filter web traffic by IP address, HTTP header, request body, or custom URI.\n    Answer: AWS WAF\n\n61. A failover configuration with primary resources normally active and secondary resources on standby.\n    Answer: Active-Passive Failover\n\n62. A data-warehouse service that can operate without a provisioned cluster and scale capacity for unpredictable workloads.\n    Answer: Amazon Redshift\n\n63. A fully managed relational database engine compatible with MySQL and PostgreSQL.\n    Answer: Amazon Aurora\n\n64. A serverless compute technology for running Amazon ECS containers without managing EC2 servers or clusters.\n    Answer: AWS Fargate\n\n65. A fully managed message-queuing service that sends, stores, and receives messages between software components.\n    Answer: Amazon Simple Queue Service (Amazon SQS)\n\n66. Connects to the same distributed storage volume as an Aurora primary DB instance and supports read operations.\n    Answer: Aurora Replica\n\n67. The AWS Cloud Adoption Framework perspective that aligns technology and business by evolving culture, organizational structure, leadership, and workforce.\n    Answer: People perspective\n\n68. A cloud-computing advantage that lets applications be deployed in multiple Regions worldwide quickly.\n    Answer: Go global in minutes\n\n69. Serverless, elastic shared file storage that removes the need to manage storage capacity and performance.\n    Answer: Amazon Elastic File System (Amazon EFS)\n\n70. Provides block-level storage volumes for use with EC2 instances.\n    Answer: Amazon Elastic Block Store (Amazon EBS)\n\n71. Provides rugged, secure devices for using AWS compute and storage at the edge and transferring data to and from AWS.\n    Answer: AWS Snowball\n\n72. Links on-premises environments to AWS cloud storage for secure hybrid-storage integration.\n    Answer: AWS Storage Gateway\n\n73. A cloud best practice based on service-oriented architecture that prevents component failures from cascading.\n    Answer: Decouple your components\n\n74. Evaluates newly created IAM policies before or while they are used.\n    Answer: IAM Policy Simulator\n\n75. The party responsible for patching the host operating system beneath an Amazon EC2 instance.\n    Answer: AWS\n\n76. Securely transfers hundreds of petabytes or exabyte-scale datasets into and out of AWS.\n    Answer: AWS Snowmobile\n\n77. The S3 operation used to upload a single object in parts for better throughput and faster recovery from network issues.\n    Answer: Use Multipart Upload API\n\n78. The lowest support plan in this question set that permits an unlimited number of technical support cases.\n    Answer: Developer Support Plan\n\n79. A single place to view the availability and operations of AWS resources and the overall status of AWS services.\n    Answer: AWS Health Dashboard\n\n80. A managed publish-and-subscribe service used to send notifications from the cloud.\n    Answer: Amazon Simple Notification Service (Amazon SNS)\n\n81. Executes a series of jobs on one or more computers without manual intervention.\n    Answer: Batch computing\n\n82. Simplifies deploying and managing applications in the AWS Cloud.\n    Answer: AWS Elastic Beanstalk\n\n83. Simplifies virtual-desktop delivery by reducing the need to manage hardware inventory, operating system versions, patches, and VDI.\n    Answer: Amazon WorkSpaces\n\n84. An open-source container-orchestration system for deploying and managing containerized applications at scale.\n    Answer: Kubernetes\n\n85. A table class that can reduce DynamoDB storage cost for infrequently accessed data.\n    Answer: DynamoDB Standard-IA\n\n86. An Auto Scaling capability that analyzes past traffic and predicts future traffic to schedule capacity adjustments.\n    Answer: Predictive Scaling\n\n87. A cryptographic service for creating and maintaining hardware security modules in an AWS environment.\n    Answer: AWS CloudHSM\n\n88. An AWS authorization strategy that defines permissions using attributes.\n    Answer: Attribute-based access control (ABAC)\n\n89. Continuously assesses, audits, and evaluates resource configurations and relationships across AWS and supported hybrid environments.\n    Answer: AWS Config\n\n90. Permissions that grant users only the minimum access needed to perform required tasks.\n    Answer: Least-privilege permissions\n\n91. A container-management service that runs, stops, and manages Docker containers on a cluster.\n    Answer: Amazon Elastic Container Service (Amazon ECS)\n\n92. A managed service that simplifies creating, operating, and scaling relational databases in the cloud.\n    Answer: Amazon Relational Database Service (Amazon RDS)\n\n93. Automatically increases RDS storage capacity as database workloads grow without downtime.\n    Answer: RDS Storage Auto Scaling\n\n94. A cloud-powered business-intelligence service for visualizations, ad-hoc analysis, and data insights.\n    Answer: Amazon QuickSight\n\n95. Estimates the cost of AWS services from specified usage parameters.\n    Answer: AWS Pricing Calculator\n\n96. Executes large volumes of batch-computing jobs on AWS efficiently.\n    Answer: AWS Batch\n\n97. A simplified service for individuals and small businesses to launch and manage virtual private servers.\n    Answer: Amazon Lightsail\n\n98. A managed service that simplifies deploying, managing, and scaling Kubernetes clusters.\n    Answer: Amazon Elastic Kubernetes Service (Amazon EKS)\n\n99. Compiles source code, runs tests, and produces deployable software packages.\n    Answer: AWS CodeBuild\n\n100. A cloud-based contact-center service designed to provide customer service at lower cost than traditional contact centers.\n    Answer: Amazon Connect\n";

  function domainFor(prompt, answer) {
    const text = (prompt + " " + answer).toLowerCase();
    if (/cost|billing|budget|reserved|upfront|spot instance|marketplace|support plan|technical account manager|trusted advisor|tco calculator|pricing calculator/.test(text)) return "Domain 4";
    if (/security|iam|permission|access|credential|policy|compliance|artifact|macie|guardduty|multi-factor|inspector|cloudtrail|kms|detective|shield|waf|cryptographic|cloudhsm|firewall|patching the host/.test(text)) return "Domain 2";
    if (/loose coupling|well-architected|people perspective|go global|decouple|failover configuration/.test(text)) return "Domain 1";
    return "Domain 3";
  }

  function categoryFor(prompt, answer) {
    const text = (prompt + " " + answer).toLowerCase();
    if (/gateway|route 53|global accelerator|direct connect|cloudfront|load balanc|region|availability zone/.test(text)) return "network";
    if (/security|iam|permission|access|credential|policy|compliance|artifact|macie|guardduty|multi-factor|inspector|cloudtrail|kms|detective|shield|waf|cloudhsm|firewall|patching the host/.test(text)) return "security";
    if (/cost|billing|budget|reserved|upfront|spot instance|marketplace|support plan|technical account manager|trusted advisor|tco calculator|pricing calculator|organizations/.test(text)) return "cost";
    if (/storage|s3|snowball|glacier|multipart|machine image|ami|efs|ebs|snowmobile/.test(text)) return "storage";
    if (/database|cache|dynamodb|redshift|aurora|rds|athena|quicksight|migration service/.test(text)) return "data";
    if (/code|application|container|kubernetes|batch|message|notification|eventbridge|x-ray|cloudwatch|fargate|workspaces|lightsail|connect/.test(text)) return "app";
    return "concept";
  }

  function parseCards(markdown) {
    const lines = markdown.split(/\r?\n/);
    const cards = [];
    for (let index = 0; index < lines.length; index += 1) {
      const match = lines[index].match(/^(\d+)\.\s+(.+)$/);
      if (!match) continue;
      const id = Number(match[1]);
      const prompt = match[2].trim();
      let answer = "";
      for (index += 1; index < lines.length; index += 1) {
        const answerMatch = lines[index].match(/^\s+Answer:\s*(.+)$/);
        if (answerMatch) {
          answer = answerMatch[1].trim();
          break;
        }
      }
      if (answer) cards.push({ id, prompt, answer });
    }
    if (cards.length !== 100) throw new Error("Expected 100 terms from quiz-2.md, parsed " + cards.length);
    return cards;
  }

  function buildQuestions(cards) {
    const enriched = cards.map(card => ({
      ...card,
      domain: domainFor(card.prompt, card.answer),
      category: categoryFor(card.prompt, card.answer)
    }));

    return enriched.map(card => {
      let pool = [...new Set(enriched
        .filter(other => other.id !== card.id && other.answer !== card.answer && other.category === card.category)
        .map(other => other.answer))];
      if (pool.length < 3) {
        pool = [...new Set(enriched
          .filter(other => other.id !== card.id && other.answer !== card.answer)
          .map(other => other.answer))];
      }

      const distractors = [];
      let cursor = (card.id * 7) % pool.length;
      while (distractors.length < 3) {
        const candidate = pool[cursor % pool.length];
        if (!distractors.includes(candidate)) distractors.push(candidate);
        cursor += 1;
      }

      const correctIndex = (card.id - 1) % 4;
      const options = [...distractors];
      options.splice(correctIndex, 0, card.answer);
      return {
        id: card.id,
        question: card.prompt,
        options,
        multiple: false,
        correct: [correctIndex],
        domain: card.domain,
        task: ({ "Domain 1": "1.1", "Domain 2": "2.1", "Domain 3": "3.1", "Domain 4": "4.1" })[card.domain],
        topic: "Quiz 2.0",
        trigger: window.AWS_EXAM_TRIGGER.fromDefinition(card.prompt),
        explanation: "The supplied term for this definition is " + card.answer + "."
      };
    });
  }

  window.QUIZ_2_QUESTIONS = buildQuestions(parseCards(SOURCE));
})();
