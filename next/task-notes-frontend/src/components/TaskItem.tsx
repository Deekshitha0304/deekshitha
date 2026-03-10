type Props = {
  title: string
}

export default function TaskItem({ title }: Props) {
  return (
    <li style={{ padding: "8px 0" }}>
      {title}
    </li>
  )
}