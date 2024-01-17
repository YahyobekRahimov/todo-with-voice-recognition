export default function Container({
   children,
   className,
}: {
   children?: React.ReactNode;
   className?: string;
}) {
   return (
      <div
         className={`mx-auto px-[18rem] max-w-[1440px] ${
            className ? className : ""
         }`}
      >
         {children}
      </div>
   );
}
