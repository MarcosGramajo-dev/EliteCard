import NotImage from '../assets/notImage.jpg'
import Crown from '../assets/icons/crown.svg'
   
export default function ProfileCard({img = '', title = '', link = '', isPremium = false}) {

return (
    <div className="min-w-[200px] min-h-[200px] flex flex-col justify-between">
        <div  className="min-h-[100px] relative overflow-hidden">
            <img src={img ? img : NotImage} alt="picture" />
            {isPremium ? (
                <div className="bg-gradient-to-r from-goldDark via-gold to-goldDark text-center text-white absolute bottom-0 w-full text-xs"> PREMIUM </div>
            ) : ''}
        </div>
        <div className="text-white my-3 flex justify-between items-center">
            {title}
            {isPremium ? (
                <span><img src={Crown} className="h-4" /></span>
            ) : ''}
            
        </div>
    </div>
);
}