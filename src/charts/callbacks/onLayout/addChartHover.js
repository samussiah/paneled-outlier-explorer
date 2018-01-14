export default function addChartHover() {
    this.wrap
        .on('mouseover', () => {
            this.buttons.style('visibility', 'visible');
        })
        .on('mouseout', () => {
            this.buttons.style('visibility', 'hidden');
        });
}
