const lollipopChart = {
    id: 'lollipopChart',
    
    afterDatasetDraw: function(chart, args, options) {
        const ctx = chart.ctx;

        for (let i = 0; i < chart.getDatasetMeta(0).data.length; i++) {
            const x = chart.getDatasetMeta(0).data[i].x;
            const y = chart.getDatasetMeta(0).data[i].y;
            
            // draw a lollipop in the mipoint of the bar

            lollipopCircle(x,y);
        }

        function lollipopCircle(x,y) {
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, 2 * Math.PI);
            // make it red
            ctx.fillStyle = '#fca311';
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }
    }
}