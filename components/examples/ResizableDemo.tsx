import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

export function ResizableDemo() {
  return (
    <section className='flex flex-col gap-y-4'>
      <ResizablePanelGroup direction='vertical' className='min-h-[200px] max-w-md rounded-lg border'>
        <ResizablePanel defaultSize={25}>
          <div className='flex h-full items-center justify-center p-6'>
            <span className='font-semibold'>Header</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={75}>
          <div className='flex h-full items-center justify-center p-6'>
            <span className='font-semibold'>Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      <ResizablePanelGroup direction='horizontal' className='min-h-[200px] max-w-md rounded-lg border'>
        <ResizablePanel defaultSize={50}>One</ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>Two</ResizablePanel>
      </ResizablePanelGroup>

      <ResizablePanelGroup direction='horizontal' className='max-w-md rounded-lg border'>
        <ResizablePanel defaultSize={50}>
          <div className='flex h-[200px] items-center justify-center p-6'>
            <span className='font-semibold'>One</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction='vertical'>
            <ResizablePanel defaultSize={25}>
              <div className='flex h-full items-center justify-center p-6'>
                <span className='font-semibold'>Two</span>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={75}>
              <div className='flex h-full items-center justify-center p-6'>
                <span className='font-semibold'>Three</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </section>
  );
}
