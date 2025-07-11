import type { DocumentBlockStepperStep } from '@gitbook/api';
import { assert } from 'ts-essentials';

import { tcls } from '@/lib/tailwind';

import type { BlockProps } from './Block';
import { Blocks } from './Blocks';

export function StepperStep(props: BlockProps<DocumentBlockStepperStep>) {
    const { block, style, ancestorBlocks, ...contextProps } = props;

    const ancestor = ancestorBlocks[ancestorBlocks.length - 1];
    assert(ancestor.type === 'stepper', 'Ancestor block must be a stepper');

    const index = ancestor.nodes.indexOf(block);

    const firstChild = block.nodes[0];
    const marginAdjustClassName = (() => {
        if (!firstChild) {
            return '';
        }
        switch (firstChild.type) {
            case 'heading-1':
                return '-mt-9';
            case 'heading-2':
                return '-mt-[calc(1.25rem+1px)]';
            default:
                return '';
        }
    })();

    return (
        <div className={tcls('mx-auto flex w-full max-w-3xl flex-row gap-4 md:gap-8', style)}>
            <div className="relative select-none">
                <div
                    className={tcls(
                        'can-override-bg can-override-text flex size-[calc(1.75rem+1px)] items-center justify-center rounded-full bg-primary-solid theme-muted:bg-primary-subtle tabular-nums',
                        'font-medium text-contrast-primary-solid theme-muted:text-primary'
                    )}
                >
                    {index + 1}
                </div>
                <div className="can-override-bg absolute top-9 bottom-2 left-[0.875rem] w-px bg-primary-7 theme-muted:bg-primary-subtle" />
            </div>
            <Blocks
                {...contextProps}
                nodes={block.nodes}
                ancestorBlocks={[...ancestorBlocks, block]}
                style={['flex-1 pb-6 [&>*+*]:mt-5', marginAdjustClassName]}
            />
        </div>
    );
}
