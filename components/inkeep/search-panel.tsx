'use client';

import {
  type ComponentProps,
  type SyntheticEvent,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from 'react';
import { Loader2, RefreshCw, Send, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Link } from '@/components/ui/link';
import type { InkeepUIMessage, ProvideLinksData } from '@/lib/ai/inkeep-qa-schema';
import { Markdown } from './markdown';
import { Presence } from '@radix-ui/react-presence';
import { useAISearchContext, useChatContext, buildUserMessage } from './search-context';

// ─── Header ────────────────────────────────────────────────────────────────────

function AISearchPanelHeader({ className, ...props }: ComponentProps<'div'>) {
  const { setOpen } = useAISearchContext();

  return (
    <div
      className={cn(
        'sticky top-0 p-4 flex items-start gap-2 border-b border-line-structure',
        className,
      )}
      {...props}
    >
      <div className="flex-1">
        <Text size="m" className="text-left font-medium text-text-primary mb-1">
          Ask AI
        </Text>
        <Text size="s" className="text-left text-text-tertiary text-xs">
          Powered by{' '}
          <Link
            href="https://inkeep.com"
            className="text-text-tertiary decoration-line-structure underline-offset-2"
            variant="underline"
          >
            Inkeep AI
          </Link>
        </Text>
      </div>

      <Button
        variant="text"
        size="small"
        icon={<X className="size-4" />}
        aria-label="Close"
        onClick={() => setOpen(false)}
        className="mt-1 mr-1"
      />
    </div>
  );
}

// ─── Input actions (retry / clear) ─────────────────────────────────────────────

function AISearchInputActions() {
  const { messages, status, setMessages, regenerate } = useChatContext();
  const isLoading = status === 'streaming';

  if (messages.length === 0) return null;

  return (
    <>
      {!isLoading && messages.at(-1)?.role === 'assistant' && (
        <Button
          variant="secondary"
          size="small"
          icon={<RefreshCw className="size-3.5" />}
          onClick={() => regenerate()}
        >
          Retry
        </Button>
      )}
      <Button
        variant="secondary"
        size="small"
        onClick={() => setMessages([])}
      >
        Clear Chat
      </Button>
    </>
  );
}

// ─── Input form ────────────────────────────────────────────────────────────────

const StorageKeyInput = '__ai_search_input';

function AISearchInput(props: ComponentProps<'form'>) {
  const { status, sendMessage, stop } = useChatContext();
  const [input, setInput] = useState(() => localStorage.getItem(StorageKeyInput) ?? '');
  const isLoading = status === 'streaming' || status === 'submitted';

  const wasLoadingRef = useRef(false);
  useEffect(() => {
    if (!isLoading && wasLoadingRef.current) {
      document.getElementById('nd-ai-input')?.focus();
    }
    wasLoadingRef.current = isLoading;
  }, [isLoading]);

  const onStart = (e?: SyntheticEvent) => {
    e?.preventDefault();
    const message = input.trim();
    if (message.length === 0) return;

    void sendMessage(buildUserMessage(message));
    setInput('');
    localStorage.removeItem(StorageKeyInput);
  };

  return (
    <form {...props} className={cn('flex items-start pe-1', props.className)} onSubmit={onStart}>
      <TextareaAutoResize
        value={input}
        placeholder={isLoading ? 'AI is answering...' : 'Ask a question'}
        autoFocus
        className="p-3 text-[14px]"
        disabled={isLoading}
        onChange={(e) => {
          setInput(e.target.value);
          localStorage.setItem(StorageKeyInput, e.target.value);
        }}
        onKeyDown={(event) => {
          if (!event.shiftKey && event.key === 'Enter') {
            onStart(event);
          }
        }}
      />
      {isLoading ? (
        <Button
          key="bn"
          variant="secondary"
          type="button"
          onClick={stop}
          size="small"
          icon={<Loader2 className="size-3 animate-spin" />}
          wrapperClassName="mt-1"
        >
          Abort
        </Button>
      ) : (
        <Button
          key="bn"
          variant="primary"
          type="submit"
          disabled={input.length === 0}
          size="small"
          icon={<Send className="size-3.5" />}
          wrapperClassName="mt-1"
        />
      )}
    </form>
  );
}

// ─── Auto-resizing textarea ────────────────────────────────────────────────────

function TextareaAutoResize(props: ComponentProps<'textarea'>) {
  const shared = cn('col-start-1 row-start-1', props.className);

  return (
    <div className="grid flex-1">
      <textarea
        id="nd-ai-input"
        {...props}
        className={cn(
          'resize-none bg-transparent placeholder:text-text-tertiary focus-visible:outline-none',
          shared,
        )}
      />
      <div className={cn(shared, 'break-all invisible')}>
        {`${props.value?.toString() ?? ''}\n`}
      </div>
    </div>
  );
}

// ─── Scrollable message list ───────────────────────────────────────────────────

function ScrollList(props: Omit<ComponentProps<'div'>, 'dir'>) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    function scrollToBottom() {
      container.scrollTo({ top: container.scrollHeight, behavior: 'instant' });
    }

    const observer = new ResizeObserver(scrollToBottom);
    scrollToBottom();

    const child = container.firstElementChild;
    if (child) observer.observe(child);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      {...props}
      className={cn('overflow-y-auto min-w-0 flex flex-col', props.className)}
    >
      {props.children}
    </div>
  );
}

// ─── Single message ────────────────────────────────────────────────────────────

const roleName: Record<string, string> = {
  user: 'you',
  assistant: 'langfuse',
};

function Message({ message, ...props }: { message: InkeepUIMessage } & ComponentProps<'div'>) {
  let markdown = '';
  let links: ProvideLinksData['links'] = [];

  for (const part of message.parts ?? []) {
    if (part.type === 'text') {
      markdown += part.text;
      continue;
    }

    if (part.type === 'tool-provideLinks' && part.input) {
      links = (part.input as ProvideLinksData).links;
    }
  }

  return (
    <div onClick={(e) => e.stopPropagation()} {...props}>
      <p
        className={cn(
          'mb-1 text-sm font-medium text-text-tertiary',
          message.role === 'assistant' && 'text-primary',
        )}
      >
        {roleName[message.role] ?? 'unknown'}
      </p>
      <div className="prose text-sm">
        <Markdown text={markdown} />
      </div>
      {links && links.length > 0 && (
        <div className="mt-2 flex flex-row flex-wrap items-center gap-1">
          {links.map((item, i) => (
            <Link
              key={i}
              href={item.url}
              className="block text-xs border border-line-structure p-3 hover:bg-surface-2 text-text-secondary no-underline"
            >
              <p className="font-medium">{item.title}</p>
              <p className="text-text-tertiary">Reference {item.label}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Message list panel (empty state + messages) ───────────────────────────────

const exampleQuestions = [
  'How can Langfuse help me?',
  'How to use the Python decorator for tracing?',
  'How to set up LLM-as-a-judge evals?',
];

function AISearchPanelList({ className, style, ...props }: ComponentProps<'div'>) {
  const chat = useChatContext();
  const messages = chat.messages.filter((msg) => msg.role !== 'system');

  const sendExampleQuestion = (question: string) => {
    void chat.sendMessage(buildUserMessage(question));
  };

  return (
    <ScrollList
      className={cn('p-4 overscroll-contain', className)}
      style={{
        maskImage:
          'linear-gradient(to bottom, transparent, white 1rem, white calc(100% - 1rem), transparent 100%)',
        ...style,
      }}
      {...props}
    >
      {messages.length === 0 ? (
        <div className="size-full flex flex-col justify-center gap-4">
          <div className="flex items-start gap-3">
            <img src="/icon256.png" alt="Langfuse" className="size-6 rounded-full mt-0.5" />
            <Text size="s" className="text-text-secondary text-left">
              Hi! I&apos;m Langfuse&apos;s AI assistant trained on documentation, help articles, and
              other content. How can I help you today?
            </Text>
          </div>
          <div className="flex flex-wrap gap-2">
            {exampleQuestions.map((question) => (
              <Button
                key={question}
                type="button"
                size="small"
                variant="secondary"
                className="text-left inline-flex"
                onClick={() => sendExampleQuestion(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {messages.map((item) => (
            <Message key={item.id} message={item} />
          ))}
        </div>
      )}
    </ScrollList>
  );
}

// ─── Hotkey handler ────────────────────────────────────────────────────────────

function useHotKey() {
  const { open, setOpen } = useAISearchContext();

  const onKeyPress = useEffectEvent((e: KeyboardEvent) => {
    if (e.key === 'Escape' && open) {
      setOpen(false);
      e.preventDefault();
    }

    if (e.key === '/' && (e.metaKey || e.ctrlKey) && !open) {
      setOpen(true);
      e.preventDefault();
    }
  });

  useEffect(() => {
    window.addEventListener('keydown', onKeyPress);
    return () => window.removeEventListener('keydown', onKeyPress);
  }, []);
}

// ─── Main panel ────────────────────────────────────────────────────────────────

export function AISearchPanel() {
  const { open, setOpen } = useAISearchContext();
  useHotKey();

  return (
    <>
      <Presence present={open}>
        <div
          data-state={open ? 'open' : 'closed'}
          className="fixed inset-0 z-30 backdrop-blur-xs bg-surface-1 data-[state=open]:animate-fd-fade-in data-[state=closed]:animate-fd-fade-out lg:hidden"
          onClick={() => setOpen(false)}
        />
      </Presence>
      <Presence present={open}>
        <div
          className={cn(
            'overflow-hidden z-30 bg-surface-1 text-text-primary [--ai-chat-width:400px] 2xl:[--ai-chat-width:460px] border-line-structure',
            'max-lg:fixed max-lg:inset-x-4 max-lg:bottom-4 max-lg:top-[calc(var(--fd-docs-row-1,4rem)+1rem)] max-lg:border max-lg:border-border max-lg:shadow-xl',
            'lg:sticky lg:top-[100px] lg:h-[calc(100dvh_-_102px)] lg:border-l lg:ms-auto lg:in-[#nd-docs-layout]:[grid-area:toc] lg:in-[#nd-notebook-layout]:row-span-full lg:in-[#nd-notebook-layout]:col-start-5',
            open
              ? 'animate-fd-dialog-in lg:animate-[ask-ai-open_200ms]'
              : 'animate-fd-dialog-out lg:animate-[ask-ai-close_200ms]',
          )}
        >
          <div className="flex flex-col size-full lg:w-(--ai-chat-width)">
            <AISearchPanelHeader />
            <AISearchPanelList className="flex-1" />
            <div className="border-t border-line-structure text-text-primary bg-surface-2">
              <AISearchInput />
              <div className="flex items-center gap-1 p-1 empty:hidden">
                <AISearchInputActions />
              </div>
            </div>
          </div>
        </div>
      </Presence>
    </>
  );
}
