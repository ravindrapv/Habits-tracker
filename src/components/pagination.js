function Pagination(props) {
  let articlesCount = props.articlesCount;
  let num = [],
    count = 5;
  count = Math.ceil(articlesCount / 5);
  for (let i = 0; i < count; i++) {
    num.push(i + 1);
  }
}
export default Pagination;
