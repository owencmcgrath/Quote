import { Action, ActionPanel, Detail, Icon } from '@raycast/api';
import { useFetch } from '@raycast/utils';

/* The stoicquotes repository was very helpful in getting this up and running. */
/* Thank you to rrajath and rajath-ramakrishna-cruise */
/* https://github.com/raycast/extensions/tree/64ab0ff5e512ef60ccf0e2158828b8cb626bfa01/extensions/stoicquotes/ */

type DailyQuote = {
    content: string;
    author: string;
  };

const endpoint = 'https://api.quotable.io/random';

export default function Command() {
  const { isLoading, data, revalidate } = useFetch<DailyQuote>(endpoint, {
  });        

  const markdownQuote = data ? `> ${data.content}\n\n_${data.author}_` : '';
  const plainTextQuote = data ? `${data.content} - ${data.author}` : '';
  const dailyQuote = !isLoading && data ? markdownQuote : 'Loading...';

  return (
    <Detail
      isLoading={isLoading}
      markdown={dailyQuote}
      actions={
        <ActionPanel>
          <Action title="New Quote" icon={Icon.ArrowClockwise} onAction={revalidate} />
          <Action.CopyToClipboard
            title="Copy as Markdown"
            content={markdownQuote}
            shortcut={{
              modifiers: ['cmd'],
              key: 'c',
            }}
          />
          <Action.CopyToClipboard
            title="Copy as Plain Text"
            content={plainTextQuote}
            shortcut={{
              modifiers: ['cmd', 'shift'],
              key: 'c',
            }}
          />
        </ActionPanel>
      }
    />
  );
}