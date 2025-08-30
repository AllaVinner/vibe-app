import { useState } from 'react';

import Plot from 'react-plotly.js';
import { useRootContext } from '../../App';

function PlotlyChartExample() {
    const [chartType, setChartType] = useState('line');
    const { theme } = useRootContext();

    // Sample data for different chart types
    const lineData = [
        {
            x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            y: [20, 14, 23, 25, 22, 16],
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Sales',
            line: { color: '#3b82f6' },
            marker: { size: 8 }
        },
        {
            x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            y: [16, 18, 17, 19, 24, 28],
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Revenue',
            line: { color: '#ef4444' },
            marker: { size: 8 }
        }
    ];

    const barData = [
        {
            x: ['Product A', 'Product B', 'Product C', 'Product D'],
            y: [45, 32, 67, 23],
            type: 'bar',
            name: 'Q1',
            marker: { color: '#10b981' }
        },
        {
            x: ['Product A', 'Product B', 'Product C', 'Product D'],
            y: [52, 38, 71, 29],
            type: 'bar',
            name: 'Q2',
            marker: { color: '#8b5cf6' }
        }
    ];

    const scatterData = [
        {
            x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            y: [2, 4, 7, 8, 12, 15, 18, 22, 25, 28],
            mode: 'markers',
            type: 'scatter',
            name: 'Dataset 1',
            marker: {
                color: '#f59e0b',
                size: 10,
                opacity: 0.7
            }
        },
        {
            x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            y: [3, 6, 8, 11, 14, 16, 19, 21, 24, 26],
            mode: 'markers',
            type: 'scatter',
            name: 'Dataset 2',
            marker: {
                color: '#ec4899',
                size: 10,
                opacity: 0.7
            }
        }
    ];

    const pieData = [
        {
            values: [35, 25, 20, 20],
            labels: ['Marketing', 'Development', 'Sales', 'Support'],
            type: 'pie',
            marker: {
                colors: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b']
            }
        }
    ];

    // Get current data based on chart type
    const getCurrentData = () => {
        switch (chartType) {
            case 'line': return lineData;
            case 'bar': return barData;
            case 'scatter': return scatterData;
            case 'pie': return pieData;
            default: return lineData;
        }
    };

    // Layout configuration
    const layout = {
        title: {
            text: `Sample ${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart`,
            font: { size: 20 }
        },
        autosize: true,
        margin: { l: 50, r: 50, t: 50, b: 50 },
        ...(chartType === 'pie' ? {} : {
            xaxis: { title: 'X Axis' },
            yaxis: { title: 'Y Axis' }
        }),
        paper_bgcolor: theme.colorNeutralBackground1,
        plot_bgcolor: theme.colorNeutralBackground1,
        font: { color: theme.colorNeutralForeground1 },
    };

    // Plot configuration
    const config = {
        responsive: true,
        displayModeBar: true,
        modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d', 'autoScale2d'],
        displaylogo: false
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Plotly React Example</h1>

            {/* Chart Type Selector */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Chart Type:
                </label>
                <select
                    value={chartType}
                    onChange={(e) => setChartType(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="line">Line Chart</option>
                    <option value="bar">Bar Chart</option>
                    <option value="scatter">Scatter Plot</option>
                    <option value="pie">Pie Chart</option>
                </select>
            </div>

            {/* Plotly Chart */}
            <div className="bg-white rounded-lg shadow-lg p-4">
                <Plot
                    data={getCurrentData()}
                    layout={layout}
                    config={config}
                    style={{ width: '100%', height: '500px' }}
                    useResizeHandler={true} />
            </div>

            {/* Data Info */}
            <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Chart Info:</h3>
                <p className="text-gray-600">
                    Currently showing: <strong>{chartType}</strong> chart with sample data.
                    This example demonstrates different chart types and interactive features.
                </p>
            </div>
        </div>
    );
}

export default PlotlyChartExample;