// text sentiment analysis function
import { SentimentAnalyzer, PorterStemmer } from 'natural';

const analyzer = new SentimentAnalyzer("English", PorterStemmer, "afinn");
const analyzeSentiment = (text) => {
    return analyzer.getSentiment(text);
}

export default analyzeSentiment