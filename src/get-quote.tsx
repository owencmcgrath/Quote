import { Action, ActionPanel, Detail, Icon } from '@raycast/api';
import { useFetch } from '@raycast/utils';

const endpoint = "https://api.quotable.io";

type RandomQuote = {
    quote: string;
    author: string;
};

export default function Command() {

}