import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';

/**
 * Build the Apify Actor input from node parameters.
 * Only the real Actor inputs are sent; the Output / Fields parameters shape the
 * data we return, they are not part of the Actor input. Optional fields are only
 * sent when the user provides a value so the Actor keeps its own defaults.
 */
export function buildActorInput(
	context: IExecuteFunctions,
	itemIndex: number,
	defaultInput: Record<string, any>,
): Record<string, any> {
	const input: Record<string, any> = {
		...defaultInput,
		mode: 'search',
		q: context.getNodeParameter('q', itemIndex),
		hl: context.getNodeParameter('hl', itemIndex),
		max_pages: context.getNodeParameter('max_pages', itemIndex),
	};

	const yearFrom = context.getNodeParameter('as_ylo', itemIndex, 0) as number;
	const yearTo = context.getNodeParameter('as_yhi', itemIndex, 0) as number;
	const num = context.getNodeParameter('num', itemIndex, 0) as number;

	if (yearFrom > 0) input.as_ylo = yearFrom;
	if (yearTo > 0) input.as_yhi = yearTo;
	if (num > 0) input.num = num;

	return input;
}

const resourceProperties: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Paper',
				value: 'paper',
			},
		],
		default: 'paper',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['paper'],
			},
		},
		options: [
			{
				name: 'Search',
				value: 'search',
				action: 'Search papers',
				description: 'Search scholarly papers and return one item per result',
			},
		],
		default: 'search',
	},
];

const actorProperties: INodeProperties[] = [
	{
		displayName: 'Search Query',
		name: 'q',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. transformer neural networks',
		description: 'The query to search scholarly papers for',
		displayOptions: { show: { resource: ['paper'], operation: ['search'] } },
	},
	{
		displayName: 'Language Code',
		name: 'hl',
		type: 'string',
		default: 'en',
		placeholder: 'e.g. en',
		description: 'Two-letter language code for the results',
		displayOptions: { show: { resource: ['paper'], operation: ['search'] } },
	},
	{
		displayName: 'Year From',
		name: 'as_ylo',
		type: 'number',
		default: 0,
		typeOptions: { minValue: 0 },
		description: 'Only include papers published on or after this year. Use 0 for no limit.',
		displayOptions: { show: { resource: ['paper'], operation: ['search'] } },
	},
	{
		displayName: 'Year To',
		name: 'as_yhi',
		type: 'number',
		default: 0,
		typeOptions: { minValue: 0 },
		description: 'Only include papers published on or before this year. Use 0 for no limit.',
		displayOptions: { show: { resource: ['paper'], operation: ['search'] } },
	},
	{
		displayName: 'Number of Results',
		name: 'num',
		type: 'number',
		default: 0,
		typeOptions: { minValue: 0 },
		description: 'How many results to request per page. Use 0 for the Actor default.',
		displayOptions: { show: { resource: ['paper'], operation: ['search'] } },
	},
	{
		displayName: 'Maximum Pages',
		name: 'max_pages',
		type: 'number',
		default: 1,
		typeOptions: { minValue: 1 },
		description: 'How many result pages to fetch',
		displayOptions: { show: { resource: ['paper'], operation: ['search'] } },
	},
];

const outputProperties: INodeProperties[] = [
	{
		displayName: 'Output',
		name: 'output',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['paper'], operation: ['search'] } },
		options: [
			{
				name: 'Raw',
				value: 'raw',
				description: 'Return every field the API produces for each paper',
			},
			{
				name: 'Selected Fields',
				value: 'selected',
				description: 'Choose exactly which fields to return',
			},
			{
				name: 'Simplified',
				value: 'simplified',
				description: 'Return a compact set of the most useful paper fields',
			},
		],
		default: 'simplified',
		description: 'How much data to return for each paper',
	},
	{
		displayName: 'Fields to Include',
		name: 'fields',
		type: 'multiOptions',
		displayOptions: {
			show: { resource: ['paper'], operation: ['search'], output: ['selected'] },
		},
		options: [
			{ name: 'Inline Links', value: 'inline_links' },
			{ name: 'Link', value: 'link' },
			{ name: 'Paper Title', value: 'paper_title' },
			{ name: 'Position', value: 'position' },
			{ name: 'Publication Info', value: 'publication_info' },
			{ name: 'Resources', value: 'resources' },
			{ name: 'Result ID', value: 'result_id' },
			{ name: 'Snippet', value: 'snippet' },
		],
		default: ['paper_title', 'link', 'snippet', 'publication_info'],
		description: 'Which fields to return when Output is set to Selected Fields',
	},
];

const authenticationProperties: INodeProperties[] = [
	{
		displayName: 'Authentication',
		name: 'authentication',
		type: 'options',
		options: [
			{
				name: 'API Key',
				value: 'apifyApi',
			},
			{
				name: 'OAuth2',
				value: 'apifyOAuth2Api',
			},
		],
		default: 'apifyApi',
		description: 'Choose which authentication method to use',
	},
];

export const properties: INodeProperties[] = [
	...resourceProperties,
	...actorProperties,
	...outputProperties,
	...authenticationProperties,
];
