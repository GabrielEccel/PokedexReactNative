import { StyleSheet } from "react-native";

export const detailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 50,
  },
  back:{
    margin: 6,
    width: 25,
  },
  card: {
    backgroundColor: 'rgba(208,208,208, 0.4)',
    borderRadius: 24,
    flex: 1,
    marginBottom: 80
  },
  info: {
    height: 200,
    padding: 20,
    flexDirection: 'row'
  },
  imgView: {
    height: 150,
    width: 150,
    overflow: "hidden",
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    backgroundColor: 'rgba(208,208,208, 1)',
    borderRadius: 8
  },
  image: {
    width: 150,
    height: 150,
  },
  content: {
    flex: 1,
    gap: 8
  },
  imgTypes: {
    height: 25,
    width: 65
  },
  viewTypes: {
    flexDirection: 'row',
    gap: 3
  },
  descriptionArea: {
    paddingHorizontal: 20,
    gap: 5,
  },
  descriptionCard: {
    backgroundColor: 'rgba(208,208,208, 1)',
    borderRadius: 8,
    padding: 8
  },
  evolutions: {
    backgroundColor: 'rgba(208,208,208, 1)',
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 24,
  },
  evolutionsText: {
    padding: 8
  },
  layer: {
    alignItems: 'center',
    marginTop: 8,
  },
  layerItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
})