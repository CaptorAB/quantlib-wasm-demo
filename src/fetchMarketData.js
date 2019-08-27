var marketData = [
    { name: "STIBOR Fixing TN", price: -0.00208, date: "2019-08-26", period: "1D", type: "Deposit" },
    { name: "STIBOR Fixing 1W", price: -0.00216, date: "2019-08-26", period: "1W", type: "Deposit" },
    { name: "STIBOR Fixing 1M", price: -0.00135, date: "2019-08-26", period: "1M", type: "Deposit" },
    { name: "STIBOR Fixing 2M", price: -0.00064, date: "2019-08-26", period: "2M", type: "Deposit" },
    { name: "STIBOR Fixing 3M", price: -0.00004, date: "2019-08-26", period: "3M", type: "Deposit" },
    { name: "STIBOR Fixing 6M", price: 0.00065, date: "2019-08-26", period: "6M", type: "Deposit" },
    { name: "OMX SEK SWAP 1Y", price: -0.00115, date: "2019-08-26", period: "1Y", type: "Swap" },
    { name: "OMX SEK SWAP 2Y", price: -0.00164, date: "2019-08-26", period: "2Y", type: "Swap" },
    { name: "OMX SEK SWAP 3Y", price: -0.00166, date: "2019-08-26", period: "3Y", type: "Swap" },
    { name: "OMX SEK SWAP 4Y", price: -0.00141, date: "2019-08-26", period: "4Y", type: "Swap" },
    { name: "OMX SEK SWAP 5Y", price: -0.0009, date: "2019-08-26", period: "5Y", type: "Swap" },
    { name: "OMX SEK SWAP 6Y", price: -0.00032, date: "2019-08-26", period: "6Y", type: "Swap" },
    { name: "OMX SEK SWAP 7Y", price: 0.00032, date: "2019-08-26", period: "7Y", type: "Swap" },
    { name: "OMX SEK SWAP 8Y", price: 0.00097, date: "2019-08-26", period: "8Y", type: "Swap" },
    { name: "OMX SEK SWAP 9Y", price: 0.00161, date: "2019-08-26", period: "9Y", type: "Swap" },
    { name: "OMX SEK SWAP 10Y", price: 0.00226, date: "2019-08-26", period: "10Y", type: "Swap" }
];
const fetchMarketData = () => marketData;

export default fetchMarketData;
