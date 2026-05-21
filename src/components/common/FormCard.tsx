import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type Props = {
    title: string;
    description?: string;
    children: React.ReactNode;
};

export const FormCard = ({
    title,
    description,
    children,
}: Props) => {
    return (
        <Card className="w-full max-w-md rounded-3xl border-0 bg-white/80 backdrop-blur shadow-2xl">

            <CardHeader className="space-y-2 pb-6">
                <CardTitle>{title}</CardTitle>

                {description && (
                    <CardDescription>
                        {description}
                    </CardDescription>
                )}
            </CardHeader>

            <CardContent>
                {children}
            </CardContent>

        </Card>
    );
};