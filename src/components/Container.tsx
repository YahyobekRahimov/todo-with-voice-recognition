export default function Container({
   children,
   className,
}: {
   children?: React.ReactNode;
   className?: string;
}) {
   return (
      <div className={`${className ? className : ""}`}>
         {children}
      </div>
   );
}
