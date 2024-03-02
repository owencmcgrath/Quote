import { Action, ActionPanel, Detail, Icon } from '@raycast/api';
import { useFetch } from '@raycast/utils';

type DailyQuote = {
    content: string;
    author: string;
  };

const endpoint = 'https://api.quotable.io/random';

export default function Command() {
  const { isLoading, data, revalidate } = useFetch<DailyQuote>(endpoint, {
    keepPreviousData: false,
    headers: {
    },
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