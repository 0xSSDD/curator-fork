import { Button, Tag, Tooltip } from '@geo/design-system';
import type { StatusItem } from '@/data/statusItems';
import { BountyFilledIcon, QuestionMarckCircleIcon } from '@/icons/icons';
import TagCard from './tag-card';

interface InfoItem {
  icon?: React.ReactNode;
  label: React.ReactNode;
  value: React.ReactNode;
  description?: React.ReactNode;
  spanRows?: number; // optional, for items that take multiple rows
}

interface InfoGridProps {
  items: InfoItem[];
}

export function InfoCard({ items }: InfoGridProps) {
  return (
    <div className="flex flex-col items-start gap-3 w-full">
      <p className="small-title text-dark-text">Details</p>

      <div className="grid grid-cols-1 gap-x-0 gap-y-0   md:gap-x-6 md:gap-y-6 sm:grid-cols-[1fr_1px_1fr] border-t border-b border-grey-light w-full">
        <div className="flex flex-col justify-start gap-0">
          {items
            .filter((c) => {
              return c.icon;
            })
            .map((item, i) => (
              <div
                key={`info_${i + 1}`}
                className={`
            grid grid-cols-[auto_1fr_auto]
            items-center
            border-b border-grey-light
            md:last:border-b-0 
            py-3           
          `}
              >
                <div className="flex items-center justify-center w-3 h-3">
                  {item.icon ?? <div className="w-3 h-3 rounded-full bg-primary-purple" />}
                </div>
                <div className="tag-text ml-2 text-grey-light-text">{item.label}</div>
                <div className="tag-text justify-self-end text-grey-light-text">{item.value}</div>
              </div>
            ))}
        </div>

        {/* Vertical divider, hidden on mobile */}
        <div className="hidden sm:block bg-grey-light md:my-4" />

        <div className="flex flex-col justify-start gap-0">
          {items
            .filter((c) => {
              return !c.icon;
            })
            .map((item, i) => (
              <div
                key={`info_${i + 1}`}
                className={`
            grid grid-cols-[auto_1fr_auto]
            items-center
            border-b border-grey-light
            last:border-b-0
            py-3             
          `}
              >
                <div className="tag-text  justify-start  text-grey-light-text">{item.label}</div>
                <div className="flex items-center ml-2 justify-center w-3 h-3">
                  {item.description && (
                    <Tooltip content={item.description}>
                      <QuestionMarckCircleIcon />
                    </Tooltip>
                  )}
                </div>

                {/* Value */}
                <div className="tag-text justify-self-end text-grey-light-text">{item.value}</div>
              </div>
            ))}
          <div
            className={`
            grid  
            justify-self-stretch
            self-stretch
            border-b border-grey-light
            last:border-b-0  
            py-3
          `}
          >
            <AssignCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export function DescriptionCard() {
  return (
    <div className="flex flex-col items-start gap-3">
      {/* Title */}
      <h2 className="small-title text-dark-text flex items-center w-full">Description</h2>

      <div className="body-copy text-dark-text w-full">
        <p>
          Document emerging crypto projects with descriptions, key features, and official links. Help expand the Crypto
          space by contributing detailed entries for 500 projects.{' '}
        </p>
        <p>
          Each project should include its name, category (e.g., DeFi, NFT, Layer 1, Infrastructure), a short description
          of what it does, founding year, and any official links (website, GitHub, Twitter, etc.). Where possible,
          include details like the team behind it, funding information, or notable milestones. The goal is to create a
          comprehensive, reliable, and interlinked dataset of crypto projects that users can explore like a living wiki.
          This bounty is ideal for contributors who enjoy research, fact-checking, and building structured knowledge.
        </p>
      </div>
    </div>
  );
}
export default function AssignCard() {
  return (
    <div
      className="flex flex-col justify-center 
             items-center  gap-3 bg-accent-blue-grey-bg rounded-[12px]  w-full h-full  min-h-[100px]"
    >
      <span className="text-dark-text tag-text ">{'Want to take on this bounty?'}</span>

      <Button variant="primary" className="button-text  ">
        {'I’m interested'}
      </Button>
    </div>
  );
}

type Submission = {
  proposalName: string;
  creator: string;
  status: StatusItem;
  payout: string;
};

type Props = {
  submissions: Submission[];
};

export function SubmissionsTable({ submissions }: Props) {
  return (
    <div className="p-0 flex flex-col gap-3 w-full mb-5">
      <h2 className="small-title text-dark-text">Submissions and payouts</h2>
      {/* Table */}
      <div className="w-full overflow-x-auto " style={{ WebkitOverflowScrolling: 'touch' }}>
        <table className="min-w-[600px] table-auto w-full border-collapse">
          <thead>
            <tr className="border-t border-b border-grey-light">
              <th className="text-left py-2 tag-text text-grey-light-text">Proposal name</th>
              <th className="text-left py-2 tag-text text-grey-light-text">Creator</th>
              <th className="text-left py-2 tag-text text-grey-light-text">Status</th>
              <th className="text-left py-2 tag-text text-grey-light-text">Payout</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((item, idx) => (
              <tr key={`row_${idx + 1}`} className={'border-b border-grey-light'}>
                <td className="py-4 pr-4 tag-text text-dark-text whitespace-normal">{item.proposalName}</td>
                <td className="py-4 pr-4 tag-text text-dark-text whitespace-normal">
                  <TagCard
                    tag={item.creator}
                    image="/images/mini_profile.png"
                    hasBackground={false}
                    action=""
                    imgSize={4}
                  />
                </td>
                <td className="py-4  pr-4 tag-text text-dark-text  whitespace-normal">
                  <StatusTag name={item.status.name} icon={item.status.icon} id={item.status.id} />
                </td>
                <td className="py-4 pr-4 tag-text text-dark-text whitespace-normal">
                  <Tag variant="payouts" icon={<BountyFilledIcon />} hasBackground={false} text={item.payout} />{' '}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export function StatusTag({ name, icon }: StatusItem) {
  return (
    <div className="relative flex flex-row items-center gap-1.5">
      <div className="order-0 w-3 h-3">{icon}</div>

      <div className="order-1 items-center tag-text">{name}</div>
    </div>
  );
}
