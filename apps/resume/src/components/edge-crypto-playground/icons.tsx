import { Lock as LockIcon, Hash as HashIcon, Key as KeyIcon } from "lucide-preact";

export const Lock = ({ className, ...props }: any) => <LockIcon class={className} {...props} />;
export const Hash = ({ className, ...props }: any) => <HashIcon class={className} {...props} />;
export const Key = ({ className, ...props }: any) => <KeyIcon class={className} {...props} />;
