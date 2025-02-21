import { Card, CardContent } from "./ui/card";

type StatsCardProp = {
    icon: React.ElementType;
    label: string;
    value: string;
    bgColor: string;
    iconColor: string;
}


const StatsCard = ({ bgColor, icon: Icon, label, value, iconColor }: StatsCardProp) => {
    return (
        <Card className={`${bgColor} border-${bgColor}-700/50 hover:bg-${bgColor}-800/80 transition-colors`}>
            <CardContent className="p-6">
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${bgColor}`}>
                        <Icon className={`size ${iconColor}`} />
                    </div>

                    <div>
                        <p className="text-sm text-zinc-400">{label}</p>
                        <p className="text-2xl font-bold">{value}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default StatsCard