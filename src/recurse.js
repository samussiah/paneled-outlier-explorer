export default function recurse() {
    this.charts.listing = this.listing;
    this.listing.charts = this.charts;
}
