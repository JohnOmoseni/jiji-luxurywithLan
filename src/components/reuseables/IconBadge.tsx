import { cva, type VariantProps } from "class-variance-authority";

const backgroundVariants = cva("", {
	variants: {
		variant: {
			default: "",
			outline: "",
			secondary:
				"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
		},
		size: {
			default: "",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

const iconVariants = cva("", {
	variants: {
		variant: {
			default: "",
			secondary:
				"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
		},
		size: {
			default: "size-8",
			sm: "size-4",
			lg: "h-10 rounded-md px-8",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

type BackgroundVariantsProps = VariantProps<typeof backgroundVariants>;
type IconVariantsProps = VariantProps<typeof iconVariants>;

type Props = {};

function IconBadge({}: Props) {
	return <div>IconBadge</div>;
}

export default IconBadge;
