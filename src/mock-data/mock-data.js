// Generate more mock data for pagination testing
const generateMockIntegrations = () => {
    const baseIntegrations = [
        {
            id: 1,
            integration: "Amazon QuickSight",
            name: "Energy",
            source: "Carbon",
            entityGroup: "ABC Group LTD - Energy",
            interval: "-",
            connectorUrl: "https://api.bravegen.com/integrations/aws/energy",
            type: "aws",
        },
        {
            id: 2,
            integration: "Amazon QuickSight",
            name: "Logistics",
            source: "Carbon",
            entityGroup: "ABC Group LTD - Logistics",
            interval: "-",
            connectorUrl: "https://api.bravegen.com/integrations/aws/logistics",
            type: "aws",
        },
        {
            id: 3,
            integration: "Amazon QuickSight",
            name: "Operations",
            source: "Carbon",
            entityGroup: "ABC Group LTD - Operations",
            interval: "-",
            connectorUrl: "https://api.bravegen.com/integrations/aws/operations",
            type: "aws",
        },
        {
            id: 4,
            integration: "Amazon QuickSight",
            name: "Electricity ToU",
            source: "Utility",
            entityGroup: "135 Albert St - Electricity",
            interval: "ToU",
            connectorUrl: "https://api.bravegen.com/integrations/aws/electricity-tou",
            type: "aws",
        },
        {
            id: 5,
            integration: "Amazon QuickSight",
            name: "Water",
            source: "Utility",
            entityGroup: "135 Albert St - Water",
            interval: "Monthly",
            connectorUrl: "https://api.bravegen.com/integrations/aws/water",
            type: "aws",
        },
        {
            id: 6,
            integration: "Kafka",
            name: "ABC Group L...",
            source: "Carbon",
            entityGroup: "ABC Group LTD",
            interval: "-",
            connectorUrl: "https://api.bravegen.com/integrations/kafka/abc-group",
            type: "kafka",
        },
        {
            id: 7,
            integration: "Zapier",
            name: "ABC Group L...",
            source: "Carbon",
            entityGroup: "ABC Group LTD",
            interval: "-",
            connectorUrl: "https://api.bravegen.com/integrations/zapier/abc-group",
            type: "zapier",
        },
        {
            id: 8,
            integration: "Zapier",
            name: "135 Albert St...",
            source: "Utility",
            entityGroup: "135 Albert St - Gas",
            interval: "Yearly",
            connectorUrl: "https://api.bravegen.com/integrations/zapier/albert-gas",
            type: "zapier",
        },
    ];

    // Generate additional entries to reach ~86 pages (5 items per page = ~430 items)
    const additionalIntegrations = [];
    const types = ['aws', 'kafka', 'zapier', 'tableau', 'powerbi'];
    const sources = ['Carbon', 'Utility'];
    const intervals = ['-', 'Monthly', 'Yearly', 'ToU', 'Daily'];
    const names = ['Energy', 'Logistics', 'Operations', 'Water', 'Gas', 'Electricity', 'Transport', 'Waste', 'Heating', 'Cooling'];
    const entities = ['ABC Group LTD', '135 Albert St', 'Main Office', 'Warehouse A', 'Warehouse B'];

    for (let i = 9; i <= 430; i++) {
        const type = types[Math.floor(Math.random() * types.length)];
        const source = sources[Math.floor(Math.random() * sources.length)];
        const name = names[Math.floor(Math.random() * names.length)];
        const entity = entities[Math.floor(Math.random() * entities.length)];
        const interval = intervals[Math.floor(Math.random() * intervals.length)];

        let integrationName;
        switch (type) {
            case 'aws':
                integrationName = 'Amazon QuickSight';
                break;
            case 'kafka':
                integrationName = 'Kafka';
                break;
            case 'zapier':
                integrationName = 'Zapier';
                break;
            case 'tableau':
                integrationName = 'Tableau';
                break;
            case 'powerbi':
                integrationName = 'Microsoft Power BI';
                break;
            default:
                integrationName = 'Unknown';
        }

        additionalIntegrations.push({
            id: i,
            integration: integrationName,
            name: name,
            source: source,
            entityGroup: `${entity} - ${name}`,
            interval: interval,
            connectorUrl: `https://api.bravegen.com/integrations/${type}/${name.toLowerCase()}-${i}`,
            type: type,
        });
    }

    return [...baseIntegrations, ...additionalIntegrations];
};

export const integrations = generateMockIntegrations();

export const services = [
    {
        id: 'aws',
        name: 'Amazon QuickSight',
        description: 'Amazon BI service to create dashboards and interactive visualisations.',
        icon: 'aws',
    },
    {
        id: 'kafka',
        name: 'Kafka',
        description: 'Real-time data streaming, event-driven architectures and messaging systems.',
        icon: 'kafka',
    },
    {
        id: 'powerbi',
        name: 'Microsoft Power BI',
        description: 'Microsoft BI service to create dashboards and interactive visualisations.',
        icon: 'powerbi',
    },
    {
        id: 'zapier',
        name: 'Zapier',
        description: 'Automation tool that connects various apps and services to automate workflows.',
        icon: 'zapier',
    },
    {
        id: 'tableau',
        name: 'Tableau',
        description: 'BI service that helps seeing and transforming data into actionable insights.',
        icon: 'tableau',
    },
    {
        id: 'measurabl',
        name: 'Measurabl',
        description: 'Enable the push and pull of data to and from measurabl via an api.',
        icon: 'measurabl',
    },
    {
        id: 'snowflake',
        name: 'Snowflake',
        description: 'Cloud data platform for data warehousing and data lakes.',
        icon: 'snowflake',
    }
];
